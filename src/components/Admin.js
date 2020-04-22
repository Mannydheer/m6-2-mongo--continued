import React, { useState, useEffect } from 'react';
import AllSeats from './AllSeats';
import AllUsers from './AllUsers';

const Admin = () => {


    const [selection, setSelection] = useState('');



    return (
        <div>

            <select id="Home" onChange={(e) => setSelection(e.target.value)}>
                <option value="Choose">Choose</option>
                <option value="SeeAllSeats">See all booked seats</option>
                <option value="SeeAllUsers">See all users</option>

            </select>
            {selection === 'SeeAllSeats' &&
                <AllSeats></AllSeats>
            }
            {selection === 'SeeAllUsers' &&
                <AllUsers></AllUsers>
            }

        </div>
    )

}

export default Admin;