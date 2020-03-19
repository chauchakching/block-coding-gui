import React from 'react'
import * as R from 'ramda'

import INSTRUCTION from './instructions'
import HelloWorldBlock from './components/HelloWorldBlock'
import ForLoopBlock from './components/ForLoopBlock'

export const nodeTree2rTree = ({ nodeTree, dispatch }) =>
  nodeTree.map(val => ({
    ...val,
    title:
      val.instruction === INSTRUCTION.HELLO_WORLD ? (
        <HelloWorldBlock dispatch={dispatch} nodeKey={val.key} {...val} />
      ) : val.instruction === INSTRUCTION.FOR_LOOP ? (
        <ForLoopBlock dispatch={dispatch} nodeKey={val.key} {...val} />
      ) : null,
    children: nodeTree2rTree({ nodeTree: val.children || [], dispatch }),
  }))
