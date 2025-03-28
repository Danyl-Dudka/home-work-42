import React from 'react'
import { useState } from 'react';
import './ListButton.css';
import {Modal} from 'antd';

export default function ShowList({ users, setUsers, isOpen, setIsOpen }) {
    const [hiddenUsers, setHiddenUsers] = useState([])
    const [editingUser, setEditingUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

        function showModal  () { // to remove
      setIsModalOpen(true); 
    };
  
    function handleOk  () {
      const updatedUsers = users.filter((user) => user.id !== userToDelete);
      setUsers(updatedUsers);
      setIsModalOpen(false);
    };
  
    function handleCancel  () {
      setIsModalOpen(false);
    };


    function handleOpen() {
        setIsOpen(prev => !prev); // maybee to remove
    }

    function deleteUser(userId) {
      setUserToDelete(userId);
      setIsModalOpen(true);
    }

    function handleEdit(user) {
        setEditingUser(user);
    }

    function handleSave(userId, updatedUser) {
      const updatedUsers = users.map((user) =>
        user.id === userId ? { ...user, ...updatedUser } : user
      );
      setUsers(updatedUsers); 
      setEditingUser(null);
    }

    return (
        <div className="list-wrapper">
            <div className="list-container">
                {users.map(user => (
                    <div key={user.id} className={`list-element ${hiddenUsers.includes(user.id) ? 'hidden' : ''}`}>
                        {editingUser && editingUser.id === user.id ? (
                            <div>
                                <input type="text" value={editingUser.name} onChange={(element) => setEditingUser({ ...editingUser, name: element.target.value })} />
                                <input type="text" value={editingUser.phone} onChange={(element) => setEditingUser({ ...editingUser, phone: element.target.value })} />
                                <input type="text" value={editingUser.email} onChange={(element) => setEditingUser({ ...editingUser, email: element.target.value })} />
                                <button type="button" onClick={() => handleSave(user.id, editingUser)}>Save</button>
                            </div>
                        ) : (
                            <div>
                                <span className="info-element">Name: {user.name}</span>
                                <span className="info-element">Phone: {user.phone}</span>
                                <span className="info-element">Email: {user.email}</span>
                                <button type="button" onClick={() => deleteUser(user.id)}>Delete</button>
                                <button type='button' className='edit-button' onClick={() => handleEdit(user)}>Edit</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <Modal title="Delete User" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <p>Are you sure that you want to delete user?</p>
            </Modal>
        </div>
    );
}
