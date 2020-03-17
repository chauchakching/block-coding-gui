import * as R from "ramda";

import ACTIONS from "./actions";
import INSTRUCTION from "./instructions";
import { createHelloWorldInstructionNode } from "./generateNodes";

const reducer = (state, { type, data }) => {
  console.log("reducer type", type);
  console.log("reducer data", data);
  switch (type) {
    case ACTIONS.SET:
      return data;

    case ACTIONS.MOVE:
      return data;

    case ACTIONS.APPEND_NODE:
      const newNode = (() => {
        switch (data.instruction) {
          case INSTRUCTION.HELLO_WORLD:
            return createHelloWorldInstructionNode({ dispatch: data.dispatch });

          default:
            throw Error("invalid instruction to append");
        }
      })();
      return R.over(
        R.lensPath(R.init(findPathByNodeKey(state, data.afterNodeKey))),
        R.append(newNode)
      )(state);

    case ACTIONS.UPDATE_NODE:
      return R.over(
        R.lensPath(findPathByNodeKey(state, data.nodeKey)),
        R.mergeLeft(data.node)
      )(state);

    default:
      console.log("!!! unknown action !!!", type);
      return state;
  }
};

export const findPathByNodeKey = (nodes, nodeKey) =>
  R.pipe(
    R.find(([key, path]) => R.equals(key, nodeKey)),
    R.last
  )(nodeTreeToPathKeyPairs([], nodes));

export function nodeTreeToPathKeyPairs(base = [], nodes) {
  return R.pipe(
    R.addIndex(R.map)(({ key, children = [] }, index) => [
      [key, [...base, index]],
      ...nodeTreeToPathKeyPairs([...base, index], children)
    ]),
    R.unnest
  )(nodes);
}

export default reducer;
