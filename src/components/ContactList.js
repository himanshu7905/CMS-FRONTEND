import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        // Assuming the backend no longer requires JWT for fetching contacts
        const res = await axios.get('http://localhost:5000/contacts');
        setContacts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchContacts();
  }, []);

  const handleDelete = async (id) => {
    try {
      // Assuming the backend no longer requires JWT for deleting contacts
      await axios.delete(`http://localhost:5000/contacts/${id}`);
      setContacts(contacts.filter((contact) => contact.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    // Assuming you're using localStorage/sessionStorage for JWT
    // localStorage.removeItem('authToken'); // Remove auth token or any other session info

    // Redirect to login page or home page after logging out
    navigate('/'); // Adjust this to your login route
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Contact List</h2>
      <button className="btn btn-primary mb-3" onClick={() => navigate('/add-edit')}>
        Add Contact
      </button>
      <button className="btn btn-danger mb-3 ms-3" onClick={handleLogout}>
        Logout
      </button>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
              <td>{contact.address}</td>
              <td>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => navigate(`/add-edit/${contact.id}`)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(contact.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactList;
