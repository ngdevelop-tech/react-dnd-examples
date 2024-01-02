import { FC } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { SimplDnD } from './pages/SimpleDnD';

import './style.css';

export const App: FC<{ name: string }> = ({ name }) => {
  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <SimplDnD />
      </DndProvider>
    </div>
  );
};
