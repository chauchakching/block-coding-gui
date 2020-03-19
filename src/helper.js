import React from 'react'
import * as R from 'ramda'

import { instructionComponents } from './instructions'

export const nodeTree2rTree = ({ nodeTree, dispatch }) =>
  nodeTree.map(val => {
    const props = {
      dispatch,
      nodeKey: val.key,
      ...val,
    }
    const Comp = instructionComponents[val.instruction]
    return {
      ...val,
      title: Comp ? <Comp {...props} /> : null,
      children: nodeTree2rTree({ nodeTree: val.children || [], dispatch }),
    }
  })
