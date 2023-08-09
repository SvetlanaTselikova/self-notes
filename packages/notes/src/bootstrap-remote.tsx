import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { store } from './redux';
import { NoteCreate, NoteEdit } from './pages';

import { NotesList } from './pages';

type Props = {
  page: 'edit' | 'list' | 'create';
};

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
      <Provider store={store}>{renderPage()}</Provider>
    </StrictMode>
  );
}

export default App;
