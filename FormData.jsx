import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './App.css'


const FormData = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleEvent = async (event) => {
    event.preventDefault();
    navigate('/show')

    const response = await axios.post ('http://localhost:3000/DataPost',{name,email});
    try{
      console.log(response.data);
    }catch(err){
      console.log(err);
    }
      
     
  }

  return (
    <div className="form-container">
      <form onSubmit={handleEvent}>
        <h2>Contact Us</h2>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          placeholder="Enter your name"
          onChange={(event) => setName(event.target.value)}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter your email"
          required
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FormData ;
