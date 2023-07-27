import React, { useEffect, useState } from 'react';
import { Alert, Snackbar } from '@mui/material';

import usePrevious from '../../utils/hooks/use-previous';

type Props = {
  isLoading: boolean;
  isError: boolean;
};

export const ActionStatusSnackbar = (props: Props) => {
  const { isLoading, isError } = props;
  const [actionStatus, setActionStatus] = useState<
    'error' | 'success' | undefined
  >();

  const isLoadingPrev = usePrevious(isLoading);

  useEffect(() => {
    if (isError) {
      setActionStatus('error');
    } else {
      if (isLoadingPrev && !isLoading) {
        setActionStatus('success');
      }
    }
  }, [isError, isLoading]);

  return (
    <Snackbar
      open={!!actionStatus}
      autoHideDuration={6000}
      onClose={() => setActionStatus(undefined)}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      {actionStatus && (
        <Alert severity={actionStatus}>
          {actionStatus === 'success'
            ? 'Complited successfully'
            : 'Ooops, something went wrong...'}
        </Alert>
      )}
    </Snackbar>
  );
};
