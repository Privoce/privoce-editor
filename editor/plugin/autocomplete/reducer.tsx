import ReactDOM, { Root } from 'react-dom/client';
import { EditorView } from 'prosemirror-view';
import { ActionKind, FromTo, Options } from './types';
import MentionSuggestions from './mention-suggestions';
import { containerId } from './container';

interface Suggestion {
  id: string;
  name: string;
}

interface Picker {
  view: EditorView | null;
  open: boolean,
  current: 0,
  range: FromTo | null;
}

const picker: Picker = { view: null, open: false, current: 0, range: null };

let suggestions: Suggestion[] = [];

let container: null | HTMLDivElement = null;
let root: null | Root = null;

function placeSuggestion() {
  if (container === null) {
    container = document.querySelector(`#${containerId}`) as HTMLDivElement;
  }
  if (root === null) root = ReactDOM.createRoot(container);
  // hide list
  container.style.display = picker.open ? 'block' : 'none';

  const rect = document.getElementsByClassName('autocomplete')[0]
    ?.getBoundingClientRect();
  if (!rect) {
    console.error('Autocomplete node not found');
    return;
  }
  container.style.position = 'fixed';
  container.style.top = `${rect.top + rect.height + 8}px`;
  container.style.left = `${rect.left}px`;
  container.style.width = '240px';

  root.render(<MentionSuggestions
    index={picker.current}
    suggestions={suggestions}
    onSelect={(i) => {
    }}
  />);
}

const reducer: Required<Options>['reducer'] = (action) => {
  picker.view = action.view;
  switch (action.kind) {
    case ActionKind.open: {
      picker.current = 0;
      picker.open = true;
      picker.range = action.range;
      placeSuggestion();
      return true;
    }
    case ActionKind.close: {
      picker.open = false;
      placeSuggestion();
      return true;
    }
    case ActionKind.up: {
      picker.current -= 1;
      picker.current += suggestions.length; // negative modulus doesn't work
      picker.current %= suggestions.length;
      placeSuggestion();
      return true;
    }
    case ActionKind.down: {
      picker.current += 1;
      picker.current %= suggestions.length;
      placeSuggestion();
      return true;
    }
    case ActionKind.filter: {
      // todo: fetch data
      suggestions = [
        { id: '1', name: 'suggestion 1' },
        { id: '2', name: 'suggestion 2' },
        { id: '3', name: 'suggestion 3' },
        { id: '4', name: 'suggestion 4' },
        { id: '5', name: 'suggestion 5: ' + action.filter },
      ];
      placeSuggestion();
      return true;
    }
    case ActionKind.enter: {
      if (!action.type) {
        console.error('Action type not found:', action);
        return false;
      }
      const nodeName = action.type.name;
      const nodeType = action.view.state.schema.nodes[nodeName];
      if (!nodeType) {
        console.error('Node type not found:', nodeName);
        return false;
      }

      const selected = suggestions[picker.current];
      const node = nodeType.create({ id: selected.id, name: selected.name });
      const tr = action.view.state.tr.replaceWith(action.range.from, action.range.to, node);
      action.view.dispatch(tr);
      return true;
    }
    default: {
      console.error('Unimplemented action kind:', action.kind);
      return false;
    }
  }
};

export default reducer;
