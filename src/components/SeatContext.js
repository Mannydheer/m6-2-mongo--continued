import React, { useEffect } from 'react';

export const SeatContext = React.createContext();

const initialState = {
  hasLoaded: false,
  seats: null,
  numOfRows: 0,
  seatsPerRow: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case 'receive-seat-info-from-server': {
      return {
        ...state,
        hasLoaded: true,
        seats: action.seats,
        numOfRows: action.numOfRows,
        seatsPerRow: action.seatsPerRow,
      };
    }
    case 'mark-seat-as-purchased': {
      return {
        ...state,
        seats: {
          ...state.seats,
          [action.seatId]: {
            ...state.seats[action.seatId],
            isBooked: true,
          },
        },
      };
    }
    case 'unMark-seat-as-purchased': {
      return {
        ...state,
        seats: {
          ...state.seats,
          [action.seatId]: {
            ...state.seats[action.seatId],
            isBooked: false,
          },
        },
      };
    }
    default:
      throw new Error(`Unrecognized action: ${action.type}`);
  }
}

export const SeatProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);


  const receiveSeatInfoFromServer = React.useCallback(
    (data) =>
      dispatch({
        type: 'receive-seat-info-from-server',
        ...data,
      }),
    [dispatch]
  );

  const markSeatAsPurchased = React.useCallback(
    (seatId) =>
      dispatch({
        type: 'mark-seat-as-purchased',
        seatId,
      }),
    [dispatch]
  );
  const unMarkSeatAsPurchased = React.useCallback(
    (seatId) =>
      dispatch({
        type: 'unMark-seat-as-purchased',
        seatId,
      }),
    [dispatch]
  );

  //useEffect that will post all seats to data base on mount.



  return (
    <SeatContext.Provider
      value={{
        state,
        actions: {
          receiveSeatInfoFromServer,
          markSeatAsPurchased,
          //isBooked will be false.
          unMarkSeatAsPurchased,

        },
      }}
    >
      {children}
    </SeatContext.Provider>
  );
};
