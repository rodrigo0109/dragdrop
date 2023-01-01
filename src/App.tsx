import React, { useEffect, useRef, useState } from 'react';
import { Sub, SubsResponseFromApi } from './types'
import './App.css';
import {
  DndContext,
  closestCenter
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy
} from '@dnd-kit/sortable'
import { SortableItem } from './components/SortableItem';
//https://docs.dndkit.com/
//https://github.com/clauderic/dnd-kit
//https://5fc05e08a4a65d0021ae0bf2-xkdjvdfnuz.chromatic.com/?path=/docs/presets-sortable-grid--basic-setup

interface AppState {
  subs: Array<Sub>
  newSubsNumber: number
}

function App() {

  const [edit, setEdit] = useState({id: ""})
  //console.log(edit)
  const [elements, setElements] = useState([
    {
      name:"Uno",
      id:1,
      position:0
    },
    {
      name:"Dos",
      id:2,
      position:1
    },
    {
      name:"Tres",
      id:3,
      position:2
    },
    {
      name:"Cuatro",
      id:4,
      position:3
    },
    {
      name:"Cinco",
      id:5,
      position:4
    },
    {
      name:"Seis",
      id:6,
      position:5
    },
  ])
  //console.log("ELEMENTS",elements)
  //Ordena bien, veer como cambiar posicion
  //boton funciona con dos clics
  const handleDragEnd = (event:any) => {
    //console.log("drag", event)
    const {active, over} = event

    if(active.id !== over.id) {
      setElements((items):any => {
        const activeIndex = active.data.current.sortable.index
        //console.log("active",activeIndex)
        //console.log(items.map(e => e.position))
        const overIndex = over.data.current.sortable.index
        //console.log("over",overIndex)
        //console.log(arrayMove(items, activeIndex, overIndex))
        //se le pasa los items, indice origen y destino
        return arrayMove(items, activeIndex, overIndex)
      })
    }
  }

  return ( 
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className='drag-container'>
        <h1>division</h1>
        <div className='droppable-area'>
          <SortableContext
            items={elements}
            strategy={rectSortingStrategy}
          >
            {/*component that use the useSortable hook*/}
            {/*map stammers passing props*/}
            {elements.map((el,i) => <SortableItem key={el.id} id={el.id} name={el.name} setEdit={setEdit} edit={edit} />)}
          </SortableContext>
        </div>
      </div>
    </DndContext>
  );
}

export default App;
