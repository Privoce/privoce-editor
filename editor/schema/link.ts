import { MarkSpec } from 'prosemirror-model';

const linkMarkSpec: MarkSpec = {
  attrs: {
    href: { default: '' },
    title: { default: null },
  },
  inclusive: false,
  parseDOM: [
    {
      tag: 'a[href]',
      getAttrs: (element) => {
        if (typeof element === 'string') {
          return { href: '', title: null };
        }
        return {
          href: element.getAttribute('href'),
          title: element.getAttribute('title'),
        };
      },
    },
  ],
  toDOM(node) {
    const { href, title } = node.attrs;
    return ['a', { href, title }, 0];
  },
};

export default linkMarkSpec;
