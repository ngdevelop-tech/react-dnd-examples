import { useDrag } from 'react-dnd';
import { ItemTypes } from '../../ItemType';
import './styles/Box.scss';
import * as classNames from 'classnames';

export const Box = ({ name }) => {
  const [{isDragging}, drag] = useDrag<{ name: string }, { name: string }, {isDragging: boolean}>(()=>({
    type: ItemTypes.BOX,
    item: { name },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
      alert(`You dropped ${item.name} into ${dropResult.name}`);
      }
    },
    collect: (monitor)=> ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId()
    })
  }));

  return <div className={ classNames('box', { 'box--dragging': isDragging })} ref={drag}>{name}</div>;
};
