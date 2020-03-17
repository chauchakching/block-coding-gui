import { nodeTreeToPathKeyPairs, findPathByNodeKey } from "./reducer";

const nodes = [
  {
    key: "1",
    children: [
      {
        key: "1.1",
        children: [
          {
            key: "1.1.1",
            children: []
          }
        ]
      },
      {
        key: "1.2",
        children: [
          {
            key: "1.2.1",
            children: []
          }
        ]
      }
    ]
  },
  {
    key: "2"
  }
];

describe("nodeTreeToPathKeyPairs", () => {
  it("generate path key pairs", () => {
    expect(nodeTreeToPathKeyPairs([], nodes)).toEqual([
      ["1", [0]],
      ["1.1", [0, 0]],
      ["1.1.1", [0, 0, 0]],
      ["1.2", [0, 1]],
      ["1.2.1", [0, 1, 0]],
      ["2", [1]]
    ]);
  });
});

describe("findPathByNodeKey", () => {
  it("find path by key", () => {
    expect(findPathByNodeKey(nodes, "1.2.1")).toEqual([0, 1, 0]);
  });
});
