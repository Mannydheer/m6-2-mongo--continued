import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FormDialog from './FormDialog';



const AllUsers = () => {

    const [users, setUsers] = useState(null)
    const [currentUser, setCurrentUser] = useState('')
    const [modalControl, setModalControl] = useState(false);

    //if the update of email was successful, it will be stored and control the useEffect below. 
    const [fetchSuccessUpdatedEmail, setFetchSuccessUpdatedEmail] = useState('')


    useEffect(() => {

        fetch('/api/get-all-users')
            .then((res) => {
                return (res.json())
            })
            .then(data => {
                setUsers(data)
            })



    }, [fetchSuccessUpdatedEmail])

    const handleEmail = (user) => {

        setModalControl(true)
        setCurrentUser(user)

    }




    return (
        <GridWrapper>
            {users !== null &&

                users.map(user => {
                    return (
                        <Wrapper onClick={() => handleEmail(user)}>
                            <div><span style={{ color: 'green' }}>Full Name:</span>{user.fullName}</div>
                            <div><span style={{ color: 'green' }}>Email: </span>{user.email}</div>
                            <div><span style={{ color: 'green' }}>Seat#:</span> {user.seat}</div>
                        </Wrapper>
                    )
                })

            }
            {modalControl && <FormDialog setModalControl={setModalControl} modalControl={modalControl}
                currentUser={currentUser} setFetchSuccessUpdatedEmail={setFetchSuccessUpdatedEmail}>

            </FormDialog>}
        </GridWrapper>
    )
}

export default AllUsers;


const GridWrapper = styled.div`
    display: grid;
    /* grid-template-columns: repeat(auto-fill, minmax(150px, 310px)); */
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr) );
    grid-column-gap: 60px;
    grid-row-gap: 10px;




`

const Wrapper = styled.div`
text-align: center;
border: solid white 0.5px;
&:hover {
        cursor: pointer;
        background-color: white;
        color: #222;
        transition: 0.5s ease all;
    }

`
