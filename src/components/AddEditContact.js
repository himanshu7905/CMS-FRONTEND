import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const AddEditContact = () => {
  const [contact, setContact] = useState({ name: '', email: '', phone: '', address: '' });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchContact = async () => {
        try {
          // Fetch the contact without the token (assuming no auth required for fetch)
          const res = await axios.get(`http://localhost:5000/contacts`);
          const selectedContact = res.data.find((c) => c.id === parseInt(id));
          setContact(selectedContact || {});
        } catch (err) {
          console.error(err);
        }
      };
      fetchContact();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        console.log("30",id)
        // Update contact without the token (assuming no auth required for update)
        await axios.put(`http://localhost:5000/contacts/${id}`, contact);
      } else {
        // Create new contact without the token (assuming no auth required for create)
        await axios.post('http://localhost:5000/contacts', contact);
      }
      navigate('/contacts');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">{id ? 'Edit Contact' : 'Add Contact'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={contact.name}
            onChange={(e) => setContact({ ...contact, name: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={contact.email}
            onChange={(e) => setContact({ ...contact, email: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input
            type="text"
            className="form-control"
            value={contact.phone}
            onChange={(e) => setContact({ ...contact, phone: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Address</label>
          <textarea
            className="form-control"
            value={contact.address}
            onChange={(e) => setContact({ ...contact, address: e.target.value })}
          />
        </div>
        <button type="submit" className="btn btn-success">
          {id ? 'Update' : 'Add'}
        </button>
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => navigate('/contacts')}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddEditContact;
