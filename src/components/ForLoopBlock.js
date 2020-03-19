import React, { useState, useCallback } from 'react'

import ACTION from '../actions'
import Block from './Block'

const ForLoopBlock = ({ nodeKey, nodeData = { count: 2 }, dispatch }) => {
  const [count, setCount] = useState(nodeData.count)
  const onChange = useCallback(
    e => {
      const newCount = e.target.input
      setCount(newCount)
      dispatch({
        type: ACTION.UPDATE_NODE_DATA,
        data: {
          nodeKey,
          nodeData: { count: newCount },
        },
      })
    },
    [dispatch, nodeKey],
  )

  return (
    <Block dispatch={dispatch} nodeKey={nodeKey}>
      <div>
        for
        <input value={count} onChange={onChange} />
        times
      </div>
    </Block>
  )
}

export default ForLoopBlock
