import React, { FC, useEffect, useRef, useState } from 'react';
import { EditorView } from 'prosemirror-view';
import { EditorState, Selection } from 'prosemirror-state';
import { DOMParser } from 'prosemirror-model';
import deserializer from './model/deserializer';
import Toolbar from './toolbar';
import schema from './schema';
import plugins from './plugin';

interface Props {
  value: any;
  autofocus?: boolean;
  onChange: (value: any) => void;
}

const Index: FC<Props> = ({ value, autofocus, onChange }) => {
  const [view, setView] = useState<EditorView | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);
  //
  // useEffect(() => {
  //   console.log('change value:', value);
  //   if (!view) return;
  //   const { state, dispatch } = view;
  //   const { tr, doc } = state;
  //   if (value === serializer(doc)) return;
  //   const allSelection = TextSelection.create(doc, 0, doc.content.size);
  //   tr.setSelection(allSelection).replaceSelectionWith(deserializer(value));
  //   dispatch(tr);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [value]);

  useEffect(() => {
    if (!ref.current) return () => {};
    const editorState = EditorState.create({
      plugins,
      doc: DOMParser.fromSchema(schema).parse(value),
    });
    const editorView = new EditorView(ref.current, {
      state: editorState,
      dispatchTransaction(tr) {
        const newState = editorView.state.apply(tr);
        onChangeRef.current(newState.toJSON());
        editorView.updateState(newState);
      },
    });
    // 在初始化时聚焦，计算 tr，保证 blockIndex 插件被触发一次
    if (autofocus) editorView.focus();
    const { tr } = editorView.state;
    tr.setSelection(Selection.atStart(tr.doc));
    editorView.dispatch(tr);
    setView(editorView);

    return () => view?.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="border-primary rounded-lg min-h-[160px] w-[680px]">
      <Toolbar />
      <div ref={ref} className="editor-body" spellCheck={false} />
    </div>
  );
};

export default Index;
