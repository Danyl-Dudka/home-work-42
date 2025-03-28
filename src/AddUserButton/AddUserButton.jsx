import React from 'react'
import { useState } from 'react';
import './../App/App.css';
import { useNavigate } from 'react-router';
import { v4 as uuidv4 } from 'uuid';

export default function AddUserButton({ users, setUsers, isOpen, setIsOpen, openList }) {
    const [newUserName, setNewUserName] = useState('');
    const [newUserPhone, setNewUserPhone] = useState('');
    const [newUserEmail, setNewUserEmail] = useState('');
    const [isListOpen, setIsListOpen] = useState(false);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const navigate = useNavigate();

    function handleOpen() {
        setIsOpen();
    }

    function openList() {
        navigate("/list");
    }

    function handleAddUser() {
        const newUser = {
            id: uuidv4(),
            name: newUserName,
            phone: newUserPhone,
            email: newUserEmail
        };
        setUsers([...users, newUser]);
        setNewUserName('');
        setNewUserPhone('');
        setNewUserEmail('');
        setIsOpen(false);
        openList();
        console.log(`${newUserName} has been added`);
    }

    return (
        <div>
            <div className='add-inputs-container'>
                <input type="text" placeholder='Name' className='input-add-element' value={newUserName} onChange={(element) => setNewUserName(element.target.value)} />
                <input type="text" placeholder='Phone' className='input-add-element' value={newUserPhone} onChange={(element) => setNewUserPhone(element.target.value)} />
                <input type="text" placeholder='Email' className='input-add-element' value={newUserEmail} onChange={(element) => setNewUserEmail(element.target.value)} />
                <div className='button-container'>
                    <button type="button" onClick={handleAddUser}>Add</button>
                    <button type="button" onClick={openList}>Cancel</button>
                </div>
            </div>
        </div>
    )
}
