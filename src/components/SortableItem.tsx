import { useSortable } from "@dnd-kit/sortable"
import {CSS} from "@dnd-kit/utilities"

export function SortableItem({id, name, edit, setEdit}:any) {

    const handleClickEdit = (id:any) => {
        console.log("click",id)
        setEdit({id:id})
    }

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({id: id})

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    }

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            {/*card stammer with data*/}
            <div className="drag">
                <h3>{name}</h3>
            <button onClick={() => handleClickEdit(id)}>{edit.id && edit.id === id ? "Guardar edicion": "Editar"}</button>
            </div>
        </div>
    )
}