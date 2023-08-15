import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { store } from './redux';
import { NoteCreate, NoteEdit } from './pages';

import { NotesList } from './pages';
import { ThemeProvider, createTheme } from '@mui/material';

type Props = {
  page: 'edit' | 'list' | 'create';
};

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

export function App(props: Props) {
  const { page } = props;
  const renderPage = () => {
    if (page === 'edit') {
      return <NoteEdit />;
    }

    if (page === 'create') {
      return <NoteCreate />;
    }

    if (page === 'list') {
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
