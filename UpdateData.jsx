import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateData = () => {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const [data, setData] = useState({
    name: '',
    email: ''
  });

  // Fetch data when the component mounts
  useEffect(() => {
    axios.get(`http://localhost:3000/DataPut/${id}`)
      .then(res => setData(res.data)) 
      .catch(err => console.log(err));
  }, [id]); 

  // Handle form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`http://localhost:3000/DataPut/${id}`, data)
      .then(res => {
        console.log(res.data);
        alert('Data updated successfully');
        navigate('/show'); // Navigate to /show after successful update
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <h3>Update Data</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter Your Name"
          value={data.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Enter Your Email"
          value={data.email}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Update</button>
      </form>
    </>
  );
};

export default UpdateData;
