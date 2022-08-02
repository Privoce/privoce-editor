import { Schema } from 'prosemirror-model';
import { addListNodes } from 'prosemirror-schema-list';

const baseSchema = new Schema({
  nodes: {
    doc: { content: 'block+' },
    // Enter 时排在最前默认优先插入该类型节点
    paragraph: {
      isTextblock: true,
      content: 'inline*',
      group: 'block',
      parseDOM: [{ tag: 'p' }],
      toDOM: () => ['p', 0],
    },
    blockquote: {
      content: 'block+',
      group: 'block',
      defining: true,
      parseDOM: [{ tag: 'blockquote' }],
      toDOM: () => ['blockquote', 0],
    },
    horizontal_rule: {
      attrs: { markup: { default: '---' } },
      group: 'block',
      selectable: true,
      draggable: true,
      parseDOM: [{ tag: 'hr' }],
      toDOM: () => ['div', ['hr']],
    },
    heading: {
      attrs: {
        bid: { default: '-1' },
        hid: { default: '-1' },
        level: { default: 1 },
      },
      content: 'inline*',
      group: 'block',
      defining: true,
      parseDOM: [
        { tag: 'h1', attrs: { level: 1 } },
        { tag: 'h2', attrs: { level: 2 } },
        { tag: 'h3', attrs: { level: 3 } },
        { tag: 'h4', attrs: { level: 4 } },
        { tag: 'h5', attrs: { level: 5 } },
        { tag: 'h6', attrs: { level: 6 } },
      ],
      toDOM: (node) => {
        const { bid, hid } = node.attrs;
        return [`h${node.attrs.level}`, { bid, hid }, 0];
      },
    },
    code_block: {
      attrs: { info: { default: '' } },
      group: 'block',
      marks: '',
      content: 'text*',
      code: true,
      defining: true,
      parseDOM: [
        {
          tag: 'pre',
          preserveWhitespace: 'full',
          getAttrs(node) {
            if (typeof node === 'string') return { info: '' };
            const el = node as HTMLElement;
            let info: string | null;
            info = el.getAttribute('info');
            if (info) return { info };
            info = el.getAttribute('lang');
            if (info) return { info };
            return { info: '' };
          },
        },
      ],
      toDOM: node => ['pre', { info: node.attrs.info }, ['code', 0]],
    },
    text: {
      inline: true,
      group: 'inline',
    },
  },
  marks: {
    strong: {
      parseDOM: [
        { tag: 'strong' },
        { style: 'font-weight=bold' },
      ],
      toDOM: () => ['strong', 0],
    },
    em: {
      parseDOM: [
        { tag: 'em' },
        { tag: 'i' },
        { style: 'font-style=italic' },
      ],
      toDOM: () => ['em', 0],
    },
    s: {
      parseDOM: [
        { tag: 's' },
        { style: 'text-decoration=line-through' },
      ],
      toDOM: () => ['s', 0],
    },
    u: { parseDOM: [{ tag: 'u' }], toDOM: () => ['u', 0] },
    code: { parseDOM: [{ tag: 'code' },], toDOM: () => ['code', 0] },
  },
});

const schema = new Schema({
  nodes: addListNodes(baseSchema.spec.nodes, 'block+', 'block'),
  marks: baseSchema.spec.marks,
});

export default schema;