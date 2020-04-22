import React from 'react';
import { useHistory } from 'react-router-dom';


const Options = () => {

    let history = useHistory();


    const handleSelection = (event) => {

        if (event.target.value == 'BookASeat') {
            history.push(`/home`)
        }
        else if (event.target.value == 'Admin') {
            history.push('/admin')
        }


    }

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>User Types</h1>
            <select id="Home" onChange={handleSelection}>
                <option value="Choose">Choose</option>
                <option value="BookASeat">User</option>
                <option value="Admin">Administrator</option>

            </select>

        </div>
    )

}

export default Options;