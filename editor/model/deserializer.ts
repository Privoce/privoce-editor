import { Node } from 'prosemirror-model';
import schema from '../schema';

export default function deserializer(text: string): Node {
  if (text === '') {
    return schema.node('doc', {}, [schema.node('paragraph')]);
  }
  // todo
  const blocks: Node[] = [];
  return schema.node('doc', {}, blocks.length === 0 ? schema.node('paragraph', {}, []) : blocks);
}
