import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ShowData = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState([]);

  // Navigate to update page with user ID
  const goto = (id) => {
    navigate(`/updateData/${id}`);
  };

  // Fetch data from the server
  const showData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/DataGet");
      setShow(response.data.user);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Delete a record by ID
  const deleteData = async (id) => {
    const confirmDelete = window.confirm("Are you sure  delete this data?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3000/DataDelete/${id}`);
      alert("Data deleted successfully");
      setShow(show.filter((item) => item._id !== id)); // Update UI after deletion
    } catch (error) {
      console.error("Error deleting data:", error);
      alert("Failed to delete data");
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    showData();
  }, []);

  return (
    <div>
      <table border="1" style={{ width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th colSpan={2}>Action</th>
          </tr>
        </thead>
        <tbody>
          {show.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>
                <button onClick={() => goto(item._id)}>Edit</button>
              </td>
              <td>
                <button onClick={() => deleteData(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowData;
