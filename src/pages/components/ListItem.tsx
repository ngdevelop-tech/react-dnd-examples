import { CSSProperties, useRef } from "react";
import { XYCoord, useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "../../ItemType";


const styles: CSSProperties = {
    border: '1px solid black',
    padding: '5px',
    marginBottom: '5px',
    background: 'white',
    // transition: 'all 2s linear'
}

export const ListItem = ({ index, title, onDrop, moveCard }) => {

    const ref = useRef<HTMLDivElement>();

    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.LIST_ITEM,
        item: { index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        end: (draggedItem, monitor) => {
            console.log("Drag End : ", draggedItem);
        }
    });

    const [{ isOver }, drop] = useDrop<{ index: number }, unknown, { isOver: boolean }>({
        accept: ItemTypes.LIST_ITEM,
        drop(item, monitor) {
            console.log('>> Drop : ', item)
            // onDrop(item.index, index)
        },
        hover(item, monitor) {

            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index

            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return
            }

            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect()

            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

            // Determine mouse position
            const clientOffset = monitor.getClientOffset()

            // Get pixels to the top
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%

            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }

            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            moveCard(item.index, index)

            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex
        },
        collect: (monitor) => ({
            isOver: monitor.isOver()
        }),
    })

    drop(drag(ref))

    return <div className="list-item" style={{
        ...styles,
        opacity: isDragging ? '0' : '1',
        background: isOver ? 'blue' : 'lightgrey'
    }} ref={ref}>
        {title}
    </div>
}