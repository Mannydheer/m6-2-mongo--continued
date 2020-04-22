import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { SeatContext } from './SeatContext';


const AllSeats = () => {

    const { state,
        actions: { unMarkSeatAsPurchased },
    } = React.useContext(SeatContext);
    const [allSeats, setAllSeats] = useState(null)

    const [button, setButton] = useState(false);
    const [currentSeat, setCurrentSeat] = useState(null)

    useEffect(() => {

        fetch('/api/seat-availability')
            .then(res => {
                return res.json()
            })
            .then(data => {
                setAllSeats(data.seats)
            })

        //on change of state, when deleted, you want to refetch updated.
    }, [state])
    const handleDeleting = (seatId) => {

        if (allSeats[seatId].isBooked) {
            //will make seat available again
            fetch('/api/delete-seat', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    seatId
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)
                    if (data.success) {
                        //dispatch action that will cause re-render and show updated seat on screen.
                        unMarkSeatAsPurchased(seatId)
                        setButton(false)
                    }
                })
        }

    }

    const handleDeleteButton = (seat) => {
        if (allSeats[seat].isBooked) {
            setButton(true)
            setCurrentSeat(seat)
        }
    }
    return (
        <GridWrapper>

            {allSeats !== null && Object.keys(allSeats).map(seat => {
                return <SeatWrapper onClick={() => handleDeleteButton(seat)}>

                    <div>{seat}</div>
                    <div>{allSeats[seat].price}</div>
                    <div>{allSeats[seat].isBooked ? <span style={{ backgroundColor: 'red' }}>"N/A"</span> :
                        <span style={{ backgroundColor: 'green' }}>"Available"</span>}</div>
                </SeatWrapper>
            })}

            {button && <Btn onClick={() => handleDeleting(currentSeat)}>Make Available?</Btn>}




        </GridWrapper>
    )

}

export default AllSeats;

const GridWrapper = styled.div`
    display: grid;
    /* grid-template-columns: repeat(auto-fill, minmax(150px, 310px)); */
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr) );
    grid-column-gap: 60px;
    grid-row-gap: 10px;




`

const SeatWrapper = styled.div`
text-align: center;
border: solid white 0.5px;
&:hover {
        cursor: pointer;
        background-color: white;
        color: #222;
        transition: 0.5s ease all;
    }

`

const Btn = styled.button`
width: 150px;
height: 80px;
background-color: red;
color: black;
position: absolute;
top: 0;
right: 0;
border-radius: 25px;
font-size: 1.2em;
outline: none;

&:hover {
    cursor: pointer;
    opacity: 0.8;

}


`


