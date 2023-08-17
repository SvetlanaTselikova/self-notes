import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { store } from './redux';
import { NoteCreate, NoteEdit } from './pages';

import { NotesList } from './pages';
import { ThemeProvider, createTheme } from '@mui/material';
import { PAGE_TYPE, RemoteComponentProps } from '@self-notes/utils';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

export function App(props: RemoteComponentProps) {
  const { page, messageBus } = props;
  const renderPage = () => {
    if (page === PAGE_TYPE.edit) {
      return <NoteEdit messageBus={messageBus} />;
    }

    if (page === PAGE_TYPE.create) {
      return <NoteCreate messageBus={messageBus} />;
    }

    if (page === PAGE_TYPE.list) {
      return <NotesList messageBus={messageBus} />;
    }
  };
  return (
    <StrictMode>
      <ThemeProvider theme={theme}>
        <Provider store={store}>{renderPage()}</Provider>
      </ThemeProvider>
    </StrictMode>
  );
}

export default App;
