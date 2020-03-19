import React from 'react'
import * as R from 'ramda'

import INSTRUCTION from './instructions'
import HelloWorldBlock from './components/HelloWorldBlock'
import ForLoopBlock from './components/ForLoopBlock'

export const nodeTree2rTree = ({ nodeTree, dispatch }) =>
  nodeTree.map(val => {
    const props = {
      dispatch,
      nodeKey: val.key,
      ...val,
    }
    return {
      ...val,
      title:
        val.instruction === INSTRUCTION.HELLO_WORLD ? (
          <HelloWorldBlock {...props} />
        ) : val.instruction === INSTRUCTION.FOR_LOOP ? (
          <ForLoopBlock {...props} />
        ) : null,
      children: nodeTree2rTree({ nodeTree: val.children || [], dispatch }),
    }
  })
