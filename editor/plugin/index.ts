import { history } from 'prosemirror-history';
import { Plugin } from 'prosemirror-state';
import { keymap } from 'prosemirror-keymap';
import { baseKeymap } from 'prosemirror-commands';
import blockIndex from './block-index';
import buildInputRules from './input-rules';
import bindKeymap from './keymap';
import schema from '../schema';

const plugins: Plugin[] = [
  blockIndex(),
  buildInputRules(schema),
  history(),
  keymap(bindKeymap(schema)),
  keymap(baseKeymap),
];

export default plugins;
