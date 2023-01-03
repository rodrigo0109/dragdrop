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
      position:0,
      division:'Leadership'
    },
    {
      name:"Dos",
      id:2,
      position:1,
      division:'Silico'
    },
    {
      name:"Tres",
      id:3,
      position:2,
      division:'Silico'
    },
    {
      name:"Cuatro",
      id:4,
      position:3,
      division:'Leadership'
    },
    {
      name:"Cinco",
      id:5,
      position:4,
      division:'Chem'
    },
    {
      name:"Seis",
      id:6,
      position:5,
      division:'Chem'
    },
    {
      name:"Siete",
      id:7,
      position:5,
      division:'Chem'
    },
    {
      name:"Ocho",
      id:8,
      position:5,
      division:'Leadership'
    },
    {
      name:"Nueve",
      id:9,
      position:5,
      division:'Chem'
    },
    {
      name:"Diez",
      id:10,
      position:5,
      division:'Chem'
    },
    {
      name:"Once",
      id:11,
      position:5,
      division:'Silico'
    },
  ])
  //const leadership = elements.filter(e => e.division === "Leadership")
  //const silico = elements.filter(e => e.division === "Silico")
  //const chem = elements.filter(e => e.division === "Chem")
  console.log("ELEMENTS",elements)
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
        <h1>Leadership</h1>
        <div className='droppable-area'>
          <SortableContext
            items={elements}
            strategy={rectSortingStrategy}
          >
            {/*component that use the useSortable hook*/}
            {/*map stammers passing props*/}
            {elements.filter(e => e.division === "Leadership").map((el,i) => <SortableItem key={el.id} id={el.id} name={el.name} setEdit={setEdit} edit={edit} elements={elements} section={"Leadership"} division={el.division}/>)}
          </SortableContext>
        </div>
        <h1>Silico</h1>
        <div className='droppable-area'>
          <SortableContext
            items={elements}
            strategy={rectSortingStrategy}
          >
            {/*component that use the useSortable hook*/}
            {/*map stammers passing props*/}
            { elements.filter(e => e.division === "Silico").map((el,i) => <SortableItem key={el.id} id={el.id} name={el.name} setEdit={setEdit} edit={edit} elements={elements} section={"Silico"} division={el.division}/>)}
          </SortableContext>
        </div>
        <h1>Chem</h1>
        <div className='droppable-area'>
          <SortableContext
            items={elements}
            strategy={rectSortingStrategy}
          >
            {/*component that use the useSortable hook*/}
            {/*map stammers passing props*/}
            { elements.filter(e => e.division === "Chem").map((el,i) => <SortableItem key={el.id} id={el.id} name={el.name} setEdit={setEdit} edit={edit} elements={elements} section={"Chem"} division={el.division}/>)}
          </SortableContext>
        </div>
      </div>
    </DndContext>
  );
}

export default App;
