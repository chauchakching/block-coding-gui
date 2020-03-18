import React, { useState, useCallback, useEffect } from 'react'

import ACTION from './actions'
import INSTRUCTION from './instructions'

const HelloWorldBlock = ({
  instruction,
  nodeKey,
  nodeData={text: ''},
  dispatch,
}) => {
  return (
    <Block dispatch={dispatch} nodeKey={nodeKey}>
      <ConsoleLog
        text={nodeData.text}
        onInput={str =>
          dispatch({
            type: ACTION.UPDATE_NODE_DATA,
            data: {
              nodeKey,
              nodeData: { text: str },
            },
          })
        }
      />
    </Block>
  )
}

const Block = ({ children, dispatch, nodeKey }) => {
  const append = useCallback(() => {
    dispatch({
      type: ACTION.APPEND_NODE,
      data: {
        // TODO: more instruction types !
        instruction: INSTRUCTION.HELLO_WORLD,
        afterNodeKey: nodeKey,
        dispatch,
      },
    })
  }, [dispatch, nodeKey])

  const remove = useCallback(() => {
    dispatch({
      type: ACTION.REMOVE_NODE,
      data: {nodeKey}
    })
  }, [dispatch, nodeKey])

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {children}
      <block-actions>
        <button onClick={append}>Append</button>
        <button onClick={remove}>Remove</button>
      </block-actions>
    </div>
  )
}

const ConsoleLog = ({ text, onInput }) => {
  const [_text, setText] = useState(text)
  const _onInput = useCallback(
    e => {
      setText(e.target.value)
      onInput(e.target.value)
    },
    [onInput],
  )
  return (
    <div>
      console.log("
      <input value={_text} onChange={_onInput} />
      ")
    </div>
  )
}

export default HelloWorldBlock
