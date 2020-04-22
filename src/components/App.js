import React from 'react';
import styled from 'styled-components';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import GlobalStyles from './GlobalStyles';
import TicketWidget from './TicketWidget';
import PurchaseModal from './PurchaseModal';
import { SeatContext } from './SeatContext';
import { BookingContext } from './BookingContext';

import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom';
import 'tippy.js/dist/tippy.css';
import Options from './Options';
import Admin from './Admin';

function App() {






  const {
    actions: { receiveSeatInfoFromServer },
  } = React.useContext(SeatContext);
  const {
    actions: { clearSnackbar },
    status,
  } = React.useContext(BookingContext);

  React.useEffect(() => {
    fetch('/api/seat-availability')
      .then(res => res.json())
      .then(receiveSeatInfoFromServer);
  }, [receiveSeatInfoFromServer]);






  return (
    <>
      <Router>
        <Options></Options>

        <GlobalStyles />
        <Switch>
          {/* -----------------------------ADMIN----------------------- */}
          <Route exact path='/admin'>
            <Admin></Admin>
          </Route>

          {/* -----------------------------HOME----------------------- */}

          <Route exact path='/home'>

            <Centered>
              <TicketWidget />
            </Centered>

            <PurchaseModal />
            <Snackbar open={status === 'purchased'} severity="success">
              <Alert
                severity="success"
                onClose={clearSnackbar}
                elevation={6}
                variant="filled"
              >
                Successfully purchased ticket! Enjoy the show.
        </Alert>
            </Snackbar>
          </Route>
        </Switch>
      </Router>


      {/* <div>
        <form>
          <input type='text' placeholder='admin'></input>
          <input type='password' placeholder='password'></input>
          <button type='onSubmit'>Login</button>
        </form>
      </div> */}
    </>
  );
}

const Centered = styled.div`


  z-index: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default App;
