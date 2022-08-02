import { Schema } from 'prosemirror-model';
import { Command } from 'prosemirror-state';
import { undo, redo } from 'prosemirror-history';
import { toggleMark, joinUp, joinDown } from 'prosemirror-commands';
import UAParser from 'ua-parser-js';

const uaParser = new UAParser();
const isMac = /Mac|iP(hone|[oa]d)/.test(uaParser.getOS().name ?? '');

function bindKeymap(schema: Schema, mapKeys?: { [key: string]: false | string }) {
  const keys: { [key: string]: Command } = {};
  let type;

  function bind(key: string, cmd: Command) {
    if (mapKeys) {
      let mapped = mapKeys[key]
      if (mapped === false) return
      if (mapped) key = mapped
    }
    keys[key] = cmd
  }

  bind('Mod-z', undo);
  bind("Shift-Mod-z", redo);
  if (!isMac) {
    bind("Mod-y", redo);
  }

  bind("Alt-ArrowUp", joinUp);
  bind("Alt-ArrowDown", joinDown);

  if (schema.marks.strong) {
    type = schema.marks.strong;
    bind("Mod-b", toggleMark(type))
    bind("Mod-B", toggleMark(type))
  }
  if (schema.marks.em) {
    type = schema.marks.em;
    bind("Mod-i", toggleMark(type))
    bind("Mod-I", toggleMark(type))
  }
  if (schema.marks.code) {
    type = schema.marks.code;
    bind("Mod-`", toggleMark(type))
  }

  return keys;
}

export default bindKeymap;
