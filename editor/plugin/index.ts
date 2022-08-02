import { history, undo, redo } from 'prosemirror-history';
import { Plugin } from 'prosemirror-state';
import { keymap } from 'prosemirror-keymap';
import { baseKeymap } from 'prosemirror-commands';
import blockIndex from './block-index';

const plugins: Plugin[] = [
  blockIndex(),
  history(),
  keymap({ 'Mod-z': undo, 'Mod-y': redo }),
  keymap(baseKeymap),
];

export default plugins;
