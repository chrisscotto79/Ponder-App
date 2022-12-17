import React from "react";
import Draggable from "react-draggable";
import { Line } from "react-lineto";
import "./connector.css";

let { boxes } = require("./data");

const boxData = mapObj(boxes, obj => {
  obj.active = false;
});

function mapObj(obj, fn) {
  Object.keys(obj).forEach(k => fn(obj[k]));
  return obj;
}

function DragBox({ active, pos, id, onDrag, onDoubleClick }) {
  function handleDrag(_, n) {
    if (onDrag) {
      onDrag({
        pos: {
          x: n.x,
          y: n.y
        },
        id,
        height: n.node.offsetHeight,
        width: n.node.offsetWidth
      });
    }
  }

  return (
    <Draggable
      defaultPosition={pos}
      onDrag={handleDrag}
      bounds="parent"
      grid={[50, 50]}
    >
      <div
        className={`box${active ? " active" : ""}`}
        onDoubleClick={() => {
          onDoubleClick(id);
        }}
      >
        {id.toUpperCase()}
      </div>
    </Draggable>
  );
}

function getEdgePos(data) {
  return {
    x: data.pos.x + data.width / 2,
    y: data.pos.y + data.height / 2
  };
}

export default function Test() {
  const [data, setData] = React.useState(boxData);
  const [left, setLeft] = React.useState(null);
  const [lineData, setLineData] = React.useState([]);

  function updateBox(data) {
    setData(s => ({
      ...s,
      [data.id]: data
    }));
  }

  function setActive(id, active) {
    setData(s => ({
      ...s,
      [id]: { ...s[id], active }
    }));
  }

  function isConnected(l, r) {
    return Boolean(
      lineData.filter(({ id }) => {
        return id === `${l}-${r}` || id === `${r}-${l}`;
      }).length
    );
  }

  function addLineData(left, right) {
    setLineData(s => [
      ...s,
      {
        id: `${left}-${right}`,
        left,
        right
      }
    ]);
  }

  function drawLine(c) {
    const leftPos = getEdgePos(data[c.left]);
    const rightPos = getEdgePos(data[c.right]);
    return {
      x0: leftPos.x,
      y0: leftPos.y,
      x1: rightPos.x,
      y1: rightPos.y
    };
  }

  function addConnection(id) {
    if (!left) {
      setLeft(id);
      setActive(id, true);
    } else if (left === id) {
      setActive(left, false);
      setLeft(null);
    } else if (isConnected(left, id)) {
      setActive(left, false);
      setLeft(null);
      console.warn(`"${left}" is connected to "${id}"`);
    } else {
      addLineData(left, id);
      setActive(id, true);
      setTimeout(() => {
        setActive(id, false);
        setActive(left, false);
        setLeft(null);
      }, 1000);
    }
  }

  function removeConnection(data) {
    setLineData(s => s.filter(d => d !== data));
  }

  return (
    <div className="App">
     
      <div className="stage">
        {Object.keys(data).map(id => (
          <DragBox
            key={id}
            onDrag={updateBox}
            onDoubleClick={addConnection}
            {...data[id]}
          />
        ))}
        {lineData.map(coord => (
          <div onDoubleClick={() => removeConnection(coord)} key={coord.id}>
            <Line {...drawLine(coord)} within="stage" className="line" />
          </div>
        ))}
      </div>
    </div>
  );
}
