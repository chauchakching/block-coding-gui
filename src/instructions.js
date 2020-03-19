export const instructionsSpec = {
  HELLO_WORLD: {
    component: require('./components/HelloWorldBlock').default,
    run: ({ nodeData: { text }, children, runNodes }) => {
      console.log(text)
    },
  },
  FOR_LOOP: {
    component: require('./components/ForLoopBlock').default,
    run: ({ nodeData: { count }, children, runNodes }) => {
      for (let i = 0; i < count; i++) {
        runNodes(children)
      }
    },
  },
}

const INSTRUCTION = {
  HELLO_WORLD: 'HELLO_WORLD',
  FOR_LOOP: 'FOR_LOOP',
}

export default INSTRUCTION
