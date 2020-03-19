import React from 'react'
import * as R from 'ramda'

import { instructionsSpec } from './instructions'

export const nodeTree2rTree = ({ nodeTree, dispatch }) =>
  nodeTree.map(val => {
    const props = {
      dispatch,
      nodeKey: val.key,
      ...val,
    }
    const Comp = R.path([val.instruction, 'component'], instructionsSpec)
    return {
      ...val,
      title: Comp ? <Comp {...props} /> : null,
      children: nodeTree2rTree({ nodeTree: val.children || [], dispatch }),
    }
  })
