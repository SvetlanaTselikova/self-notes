import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { NotesList, NoteCreate, NoteEdit } from './pages';

const router = createBrowserRouter([
  {
    path: '/list',
    element: <NotesList />,
  },
  {
    path: '/create',
    element: <NoteCreate />,
  },
  { path: '/edit/:noteId', element: <NoteEdit /> },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
