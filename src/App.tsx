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
  const [stammers, setStammers] = useState()
  const obj = {
    "Leadership":[
      {
        name:"Raul Sanchez",
        id:1,
        position:0,
        division:'Leadership'
      },
      {
        name:"Pablo Ruiz",
        id:2,
        position:0,
        division:'Leadership'
      },
      {
        name:"Martin Hess",
        id:3,
        position:0,
        division:'Leadership'
      }
    ],
    "Silico": [
      {
        name:"Mariana Ech",
        id:4,
        position:0,
        division:'Silico'
      },
      {
        name:"Vicky Fitz",
        id:5,
        position:0,
        division:'Silico'
      },
      {
        name:"Ale Paez",
        id:6,
        position:0,
        division:'Silico'
      }
    ],
    "Chem": [
      {
        name:"Sergio",
        id:7,
        position:0,
        division:'Chem'
      },
      {
        name:"Ernesto",
        id:8,
        position:0,
        division:'Chem'
      },
      {
        name:"Gustavo",
        id:9,
        position:0,
        division:'Chem'
      },
      {
        name:"Luis",
        id:10,
        position:0,
        division:'Chem'
      },
      {
        name:"Carlos",
        id:11,
        position:0,
        division:'Chem'
      },
      {
        name:"Esteban",
        id:12,
        position:0,
        division:'Chem'
      },
    ]
  }
  const arraysOfStammers = Object.values(obj) //me quedo con los valores delas keys
  const leadership = arraysOfStammers[0]
  const silico = arraysOfStammers[1]
  const chem = arraysOfStammers[2]
  const join = leadership.concat(silico, chem) //union arrays

  const [elements, setElements] = useState(join)
  //const leadership = elements.filter(e => e.division === "Leadership")
  //const silico = elements.filter(e => e.division === "Silico")
  //const chem = elements.filter(e => e.division === "Chem")
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
