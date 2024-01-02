import { useDrag } from 'react-dnd';
import { ItemTypes } from '../../ItemType';
import './styles/Box.scss';

export const Box = ({ name }) => {
  const [{}, drag] = useDrag<{ name: string }, { name: string }>({
    type: ItemTypes.BOX,
    item: { name },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      alert(`You dropped ${item.name} into ${dropResult.name}`);
    },
  });

  return <div className="box">{name}</div>;
};
