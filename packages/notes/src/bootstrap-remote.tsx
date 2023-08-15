import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { store } from './redux';
import { NoteCreate, NoteEdit } from './pages';

import { NotesList } from './pages';
import { ThemeProvider, createTheme } from '@mui/material';
import { PAGE_TYPE, RemoteComponentProps } from '@self-notes-frontend/utils';

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
  const { page } = props;
  const renderPage = () => {
    if (page === PAGE_TYPE.edit) {
      return <NoteEdit />;
    }

    if (page === PAGE_TYPE.create) {
      return <NoteCreate />;
    }

    if (page === PAGE_TYPE.list) {
      return <NotesList />;
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
