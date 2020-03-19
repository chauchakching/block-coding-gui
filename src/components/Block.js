import React, { useCallback } from 'react'

import ACTION from '../actions'
import INSTRUCTION from '../instructions'

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
      data: { nodeKey },
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

export default Block
