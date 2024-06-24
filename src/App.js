import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [students, setStudents] = useState([]);
  const [flashMessage, setFlashMessage] = useState(''); // State for flash message

  useEffect(() => {
    fetchStudents();
  }, []);
  
  const BASEPATH = 'http://localhost:4000';

  const fetchStudents = () => {
    axios.get(`${BASEPATH}/api/data`)
      .then((response) => setStudents(response.data))
      .catch((error) => console.error('Error fetching students:', error));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const studentData = { name, email };

    axios.post(`${BASEPATH}/api/data`, studentData)
      .then((response) => {
        console.log('Data posted successfully:', response.data);
        setFlashMessage('Data submitted successfully!'); // Set flash message
        fetchStudents(); // Refresh the students list after posting
        setTimeout(() => setFlashMessage(''), 3000); // Clear flash message after 3 seconds
      })
      .catch((error) => {
        console.error('Error posting data:', error);
        setFlashMessage('An error occurred while submitting data.'); // Set error message
        setTimeout(() => setFlashMessage(''), 3000); // Clear flash message after 3 seconds
      });
  };

  const handleDelete = (id) => {
    axios.delete(`${BASEPATH}/api/data/${id}`)
      .then((response) => {
        console.log('Data deleted successfully:', response.data);
        setFlashMessage('Data deleted successfully!'); // Set flash message
        fetchStudents(); // Refresh the students list after deleting
        setTimeout(() => setFlashMessage(''), 3000); // Clear flash message after 3 seconds
      })
      .catch((error) => {
        console.error('Error deleting data:', error);
        setFlashMessage('An error occurred while deleting data.'); // Set error message
        setTimeout(() => setFlashMessage(''), 3000); // Clear flash message after 3 seconds
      });
  };

  return (
    <div className="container mt-5">
      {flashMessage && (
        <div className="alert alert-success" role="alert">
          {flashMessage}
        </div>
      )}
      <div className="row">
        {/* Form to post data */}
        <div className="col-md-6">
          <h2>New Students</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>

        {/* Table to display data */}
        <div className="col-md-6">
          <h2>Students List</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student,index) => (
                <tr key={student._id}>
                  <th scope="row">{index+1}</th>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>
                    <button 
                      className="btn btn-danger"
                      onClick={() => handleDelete(student._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
