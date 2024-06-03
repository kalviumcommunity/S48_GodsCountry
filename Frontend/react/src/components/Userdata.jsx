import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Userdata() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3001/getusers')
            .then(result => setUsers(result.data))
            .catch(err => console.error(err));
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/deleteUsers/${id}`)
            .then(res => {
                console.log(res);
                setUsers(users.filter(user => user._id !== id));
            })
            .catch(err => console.error(err));
    };

    const handleFeedback = (id) => {
        // Redirect to the feedback page for the selected user
        navigate(`/feedback/${id}`);
    };

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className='w-100 bg-white rounded p-3'>
                <Link to="/signup" className='btn btn-success'>Sign Up</Link>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Password</th>
                            <th>Action</th>
                            <th>Feedback</th> {/* Add Feedback column header */}
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.age}</td>
                                <td>{user.password}</td>
                                <td>
                                    <Link to={`/update/${user._id}`} className='btn btn-success'>Update Your Data</Link>
                                    <button className='btn btn-danger' onClick={() => handleDelete(user._id)}>Delete</button>
                                </td>
                                <td>
                                    <button className='btn btn-primary' onClick={() => handleFeedback(user._id)}>Feedback</button> {/* Add Feedback button */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Userdata;