import { useDrop } from 'react-dnd';
import './styles/Dustbin.scss';
import { ItemTypes } from '../../ItemType';
import * as classNames from 'classnames';

export const Dustbin = () => {
  const [{canDrop, isOver}, drop] = useDrop(()=>({
    accept: ItemTypes.BOX,
    drop: (item, monitor)=> {
      console.log(">> Dustbin: (drop) : ", {item, monitor})
      return {name: 'Dustbin'}
    },
    collect: (monitor)=> ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  }))


  return <div className={classNames('dustbin', {'dustbin--is-over': isOver, 'dustbin--can-drop': canDrop})} ref={drop}>Drag box here</div>;
};
