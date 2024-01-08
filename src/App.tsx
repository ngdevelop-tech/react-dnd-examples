import { FC } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { PagesRoot } from './pages';

import {  RouterProvider, createBrowserRouter } from 'react-router-dom';
import { SimplDnD } from './pages/SimpleDnD';

import './style.css';
import { SingleList } from './pages/SingleList';

const router = createBrowserRouter([{
  path: '/',
  element: <PagesRoot />,
  children: [{
    path: 'simple',
    element: <SimplDnD />
  },
  {
    path: 'single-list',
    element: <SingleList />
  }]
}])


export const App: FC<{ name: string }> = ({ name }) => {
  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <RouterProvider  router={router } />
      </DndProvider>
    </div>
  );
};
