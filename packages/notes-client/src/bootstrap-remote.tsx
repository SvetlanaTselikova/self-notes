import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { getStore } from './redux';
import { NoteCreate, NoteEdit } from './pages';

import { NotesList } from './pages';
import { ThemeProvider, createTheme } from '@mui/material';
import { PAGE_TYPE, RemoteComponentProps } from '@self-notes/utils';
import { createCustomApi } from './redux/services/api';
import { ApiContext } from './contexts/api';

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

  const apiData = createCustomApi({ messageBus });
  const store = getStore(apiData.api);

  return (
    <StrictMode>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <ApiContext.Provider value={apiData}>
            {renderPage()}
          </ApiContext.Provider>
        </Provider>
      </ThemeProvider>
    </StrictMode>
  );
}

export default App;
