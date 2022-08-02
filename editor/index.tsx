import React, { FC, useEffect, useRef, useState } from 'react';
import { EditorView } from 'prosemirror-view';
import { EditorState, Selection } from 'prosemirror-state';
import { DOMParser, DOMSerializer, Node } from 'prosemirror-model';
import Toolbar from './toolbar';
import schema from './schema';
import plugins from './plugin';

interface Props {
  value: string;
  autofocus?: boolean;
  onChange: (value: string) => void;
}

const Index: FC<Props> = ({ value, autofocus, onChange }) => {
  const [view, setView] = useState<EditorView | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    if (!ref.current) return;
    const serializer = new XMLSerializer();

    const getHtml = (s: EditorState): string => {
      const html = DOMSerializer.fromSchema(schema).serializeFragment(s.doc.content);
      return serializer.serializeToString(html);
    };

    const setHtml = (html: string): Node => {
      const element = document.createElement('div');
      element.innerHTML = html;
      return DOMParser.fromSchema(schema).parse(element);
    };

    const editorState = EditorState.create({ plugins, doc: setHtml(value) });
    const editorView = new EditorView(ref.current, {
      state: editorState,
      dispatchTransaction(tr) {
        const newState = editorView.state.apply(tr);
        const html = getHtml(newState);
        onChangeRef.current(html);
        editorView.updateState(newState);
      },
    });

    // 在初始化时聚焦，计算 tr，保证 blockIndex 插件被触发一次
    if (autofocus) editorView.focus();
    const { tr } = editorView.state;
    tr.setSelection(Selection.atStart(tr.doc));
    editorView.dispatch(tr);
    setView(editorView);

    return () => {
      setView(null);
      editorView.destroy();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="cursor-text border-primary divide-color-primary divide-y rounded-lg min-h-[160px] w-[680px]"
      onClick={e => {
        e.stopPropagation();
        if (e.target !== e.currentTarget) return;
        view?.focus();
      }}
    >
      <Toolbar view={view} schema={schema} />
      <div ref={ref} className="editor-body" spellCheck={false} />
    </div>
  );
};

export default Index;
