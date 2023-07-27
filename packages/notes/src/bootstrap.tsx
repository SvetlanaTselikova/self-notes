import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import { Provider } from 'react-redux';
import { store } from './redux';
import { NoteCreate } from './pages';

import HttpRequestMock from 'http-request-mock';
import { DayMood, Note } from './redux/types';
const mocker = HttpRequestMock.setup();

const API_URL = 'http://localhost:8000/api';

const MOCK_NOTES: Note[] = [
  {
    id: 1,
    text: 'test my text bla blad dddd s s ss s d d d d dssssss ssss',
    mood: DayMood.good,
    createdAt: new Date('2022-08-08 12:00'),
    updatedAt: new Date('2022-08-08 12:00'),
  },
  {
    id: 2,
    text: 'ttetetetetetetetete etetegege egegeggege',
    mood: DayMood.normal,
    createdAt: new Date('2022-08-07 12:00'),
    updatedAt: new Date('2022-08-07 12:00'),
  },
  {
    id: 3,
    text: 'ttetetetetetetetete etetegege egegeggeges s s s s s s s ssssss ',
    mood: DayMood.bad,
    createdAt: new Date('2022-08-06 12:00'),
    updatedAt: new Date('2022-08-06 12:00'),
  },
];

mocker.get(`${API_URL}/notes`, { data: MOCK_NOTES });

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Provider store={store}>
      <NoteCreate mode="create" />
    </Provider>
  </StrictMode>
);
