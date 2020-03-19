import React, { useState, useCallback } from 'react'

import ACTION from '../actions'
import Block from './Block'

const HelloWorldBlock = ({ nodeKey, nodeData = { text: '' }, dispatch }) => {
  const [text, setText] = useState(nodeData.text)
  const onChange = useCallback(
    e => {
      const newText = e.target.value

      setText(newText)

      dispatch({
        type: ACTION.UPDATE_NODE_DATA,
        data: {
          nodeKey,
          nodeData: { text: newText },
        },
      })
    },
    [dispatch, nodeKey],
  )
  return (
    <Block dispatch={dispatch} nodeKey={nodeKey}>
      <div>
        console.log("
        <input value={text} onChange={onChange} />
        ")
      </div>
    </Block>
  )
}

export default HelloWorldBlock
