import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  NOTES_CREATE_PATH,
  NOTES_EDIT_PATH,
  NOTES_LIST_PATH,
} from '@self-notes/utils';
import { NotesList, NoteCreate, NoteEdit } from './pages';

const router = createBrowserRouter([
  {
    path: NOTES_LIST_PATH,
    element: <NotesList />,
  },
  {
    path: NOTES_CREATE_PATH,
    element: <NoteCreate />,
  },
  { path: `${NOTES_EDIT_PATH}/:noteId`, element: <NoteEdit /> },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
