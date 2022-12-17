import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";
import './Arena.css';
import { v4 as uuidv4 } from "uuid";




export default function Arenabody(){
  const [item, setItem] = useState("");
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("items")) || []
  );
    const [color, setColor] = useState(null);
    

    


    //Start of the boxes iteself
  
      const newitem = () => {
        if (item.trim() !== "") {
          const newitem = {
            id: uuidv4(),
            item: item,
            color: color,
            defaultPos: { x: 100, y: 100 },
          };
          setItems((items) => [...items, newitem]);
          setItem("");
        } else {
          alert("Enter a item");
          setItem("");
        }
      };
    
      const keyPress = (event) => {
        var code = event.keyCode || event.which;
        if (code === 13) {
          newitem();
        }
      };
    
      useEffect(() => {
        localStorage.setItem("items", JSON.stringify(items));
      }, [items]);
    
      const updatePos = (data, index) => {
        let newArr = [...items];
        newArr[index].defaultPos = { x: data.x, y: data.y };
        setItems(newArr);
      };
    
      const deleteNote = (id) => {
        setItems(items.filter((item) => item.id !== id));
      };

    return(
      <>
      <div className="arenaBody">
        <div className="contentPanel">
            <div className="contentContainer">
            <h1>PONDER</h1>
            
              <div  id="new-item">
                <span>
                  <input
                  className="inputMain"
                  value={item}
                  onChange={(e) => setItem(e.target.value)}
                  placeholder="Enter Body..."
                  onKeyPress={(e) => keyPress(e)}
                  />        
                  <button className="subButton" onClick={newitem}>ENTER</button>
                  <input className= 'colorPicker' type="color" value={color} onChange={e => setColor(e.target.value)} />
                </span>
              </div>
              <div id="items">
               
                
                {items.map((item, index) => {
                  return (
                    <>
                    <Draggable
                      key={item.id}
                      defaultPosition={item.defaultPos}
                      onStop={(e, data) => {
                        updatePos(data, index);
                      }}

                      
                    >
                                
                  <div className="box">
                    <div className="header" style={{ backgroundColor: item.color }} >
                    </div>
                    <p> {`${item.item}`}</p>
                    <button id="delete" onClick={(e) => deleteNote(item.id)}>
                      X
                    </button>
                  </div>

                  

                  </Draggable>  
                  
            

                  </>
                );
                })}
                
              </div>    
            </div>
          </div>
      </div>
      </>
    );
};





