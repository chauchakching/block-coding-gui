import React, {
  Fragment,
  useState,
  useCallback,
  useReducer,
  useEffect,
} from 'react'
import { Tree } from 'antd'
import { v4 as uuidv4 } from 'uuid'

import ACTION from './actions'
import reducer from './reducer'
import INSTRUCTION from './instructions'
import { nodeTree2rTree } from './helper'

/**
 * TODO:
 * - add second instruction
 * - execute the 2 instructions in the tree
 * - add button for insert/remove instructions
 *
 * - add type 2 instruction
 */

const AddNewBlock = () => (
  <button onClick={() => console.log('add new block')}>Add new block</button>
)

const initialNoteTree = [{
key: uuidv4(),
instruction: INSTRUCTION.HELLO_WORLD,
nodeData: {text: 'hey there'}
}]

const App = () => {
  const [nodeTree, dispatch] = useReducer(reducer, initialNoteTree)

  // const [expandedKeys, setExpandedKeys] = useState(['0-0', '0-0-0', '0-0-0-0'])

  const run = useCallback(() => {
    console.clear()

    nodeTree.forEach(({instruction, nodeData}) => {
      console.log(`--- instruction: ${instruction} ---`)
      switch (instruction) {
        case INSTRUCTION.HELLO_WORLD:
          console.log(nodeData.text)
          break

        default:
          console.log('!!! unknown instruction !!!', instruction)
      }
    })
  }, [nodeTree])

  const onDragEnter = info => {
    console.log('onDragEnter', info)
    // expandedKeys 需要受控时设置
    // this.setState({
    //   expandedKeys: info.expandedKeys,
    // });
  }

  const onDrop = info => {
    console.log('onDrop', info)
    console.log('node', info.node)
    console.log('event', info.event)
    const dropKey = info.node.props.eventKey
    const dragKey = info.dragNode.props.eventKey
    const dropPos = info.node.props.pos.split('-')
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1])

    const loop = (data, key, callback) => {
      data.forEach((item, index, arr) => {
        if (item.key === key) {
          return callback(item, index, arr)
        }
        if (item.children) {
          return loop(item.children, key, callback)
        }
      })
    }
    const data = [...nodeTree]

    // Find dragObject
    let dragObj
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1)
      dragObj = item
    })

    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, item => {
        item.children = item.children || []
        // where to insert 示例添加到尾部，可以是随意位置
        item.children.push(dragObj)
      })
    } else if (
      (info.node.props.children || []).length > 0 && // Has children
      info.node.props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, item => {
        item.children = item.children || []
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj)
      })
    } else {
      let ar
      let i
      loop(data, dropKey, (item, index, arr) => {
        ar = arr
        i = index
      })
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj)
      } else {
        ar.splice(i + 1, 0, dragObj)
      }
    }

    dispatch({ type: ACTION.MOVE, data })
  }

  console.log('render() nodeTree', nodeTree)
  return (
    <Fragment>
      <button onClick={run}>Run</button>
      <Tree
        className="draggable-tree"
        // defaultExpandedKeys={expandedKeys}
        draggable
        blockNode
        onDragEnter={onDragEnter}
        onDrop={onDrop}
        treeData={nodeTree2rTree({nodeTree, dispatch})}
      />
    </Fragment>
  )
}

export default App
