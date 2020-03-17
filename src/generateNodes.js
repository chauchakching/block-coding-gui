import React, { useState, useCallback, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "antd/dist/antd.css";
import "./index.css";

import ACTION from "./actions";
import INSTRUCTION from "./instructions";

const Block = ({ children, dispatch, nodeKey }) => {
  const append = useCallback(() => {
    dispatch({
      type: ACTION.APPEND_NODE,
      data: {
        // TODO: more instruction types !
        instruction: INSTRUCTION.HELLO_WORLD,
        afterNodeKey: nodeKey,
        dispatch
      }
    });
  }, [dispatch, nodeKey]);
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {children}
      <block-actions>
        <button onClick={append}>Append</button>
      </block-actions>
    </div>
  );
};

const ConsoleLog = ({ text, onInput }) => {
  const [_text, setText] = useState(text);
  const _onInput = useCallback(
    e => {
      setText(e.target.value);
      onInput(e.target.value);
    },
    [onInput]
  );
  return (
    <div>
      console.log("
      <input value={_text} onChange={_onInput} />
      ")
    </div>
  );
};

export const createHelloWorldInstructionNode = ({
  dispatch,
  text = "hello world"
}) => {
  const nodeKey = uuidv4();
  const node = {
    title: (
      <Block dispatch={dispatch} nodeKey={nodeKey}>
        <ConsoleLog
          text={text}
          onInput={str =>
            dispatch({
              type: ACTION.UPDATE_NODE,
              data: {
                nodeKey,
                node: {
                  text: str
                }
              }
            })
          }
        />
      </Block>
    ),
    instruction: INSTRUCTION.HELLO_WORLD,
    text,
    key: nodeKey,
    children: []
  };

  return node;
};
