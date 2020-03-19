import * as R from 'ramda'

export const instructionComponents = {
  HELLO_WORLD: require('./components/HelloWorldBlock').default,
  FOR_LOOP: require('./components/ForLoopBlock').default,
}

const INSTRUCTION = {
  HELLO_WORLD: 'HELLO_WORLD',
  FOR_LOOP: 'FOR_LOOP',
}

export default INSTRUCTION
