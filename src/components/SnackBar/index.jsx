import * as React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { isError, setMessage } from '../../redux/app.slice';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Message() {
  const dispatch = useDispatch();

  const app = useSelector(state => state.app);
  const severity = app.error ? 'error' : 'success';

  const open = useSelector(state => state.app.message ? true : false) 
  const handleClose = (e) => {
    dispatch(setMessage(''));
    dispatch(isError(false));
  }

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {app.message}
      </Alert>
    </Snackbar>
  );
}

export default Message;

