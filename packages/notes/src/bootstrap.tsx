import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HttpRequestMock from 'http-request-mock';
import { DayMood, Note } from './redux/types';
import { NotesList, NoteCreate, NoteEdit } from './pages';
// const mocker = HttpRequestMock.setup();

// const API_URL = 'http://localhost:8000/api';

// const MOCK_NOTES: Note[] = [
//   {
//     id: 1,
//     text: 'test my text bla blad dddd s s ss s d d d d dssssss ssss',
//     mood: DayMood.good,
//     date: new Date('2022-08-08 12:00'),
//   },
//   {
//     id: 2,
//     text: 'ttetetetetetetetete etetegege egegeggege',
//     mood: DayMood.normal,
//     date: new Date('2022-08-07 12:00'),
//   },
//   {
//     id: 3,
//     text: 'ttetetetetetetetete etetegege egegeggeges s s s s s s s ssssss ',
//     mood: DayMood.bad,
//     date: new Date('2022-08-06 12:00'),
//   },
// ];

// mocker.get(`${API_URL}/notes`, { data: MOCK_NOTES });

// mocker.get(`${API_URL}/notes/1`, { data: MOCK_NOTES[0] });

// mocker.post(`${API_URL}/notes`, { data: MOCK_NOTES[0] });
// mocker.patch(`${API_URL}/notes`, { data: MOCK_NOTES[0] });
// mocker.delete(`${API_URL}/notes/1`, {});

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
