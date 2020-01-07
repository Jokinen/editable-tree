import React, { useState } from "react";
import styled from "styled-components";
import uuid from "uuid/v4";
import set from "lodash.set";
import get from "lodash.get";
import cloneDeep from "lodash.clonedeep";

const List = styled.ul`
  margin: 0;

  list-style-type: none;
`;
const ListItem = styled.li`
  margin: 8px 0;
`;
const Button = styled.button`
  padding: 0;
  margin: 0;

  font-family: monospace;
  font-size: 16px;
  color: blue;

  background: none;
  border: none;
  cursor: pointer;
`;

const initialState = [
  {
    id: uuid(),
    children: [
      {
        id: uuid(),
        children: [
          { id: uuid(), children: [] },
          { id: uuid(), children: [] }
        ]
      },
      {
        id: uuid(),
        children: []
      }
    ]
  }
];

function RapalExerciseComponent() {
  const [nodes, setNodes] = useState(initialState);

  const addNode = path => {
    const arrayPath = path
      .map(index => [index, "children"])
      .reduce((flattenedArray, tuple) => [...flattenedArray, ...tuple], []);

    setNodes(nodes => {
      const nodesCopy = cloneDeep(nodes);
      const previousChildren = get(nodesCopy, arrayPath);

      set(nodesCopy, arrayPath, [
        ...previousChildren,
        { id: uuid(), children: [] }
      ]);

      return nodesCopy;
    });
  };

  const renderNode = (node, path) => {
    const humanReadablePath = path.map(index => index + 1).join(".");

    return (
      <>
        Noodi {humanReadablePath}
        <List key={node.id} data-testid={humanReadablePath}>
          {node.children.map((node, index) => (
            <ListItem key={node.id}>
              {renderNode(node, [...path, index])}
            </ListItem>
          ))}
          <ListItem>
            <Button type="button" onClick={() => addNode(path)}>
              [Lisää]
            </Button>
          </ListItem>
        </List>
      </>
    );
  };

  return (
    <>
      {nodes.map((node, index) => (
        <React.Fragment key={node.id}>
          {renderNode(node, [index])}
        </React.Fragment>
      ))}
    </>
  );
}

export default RapalExerciseComponent;
