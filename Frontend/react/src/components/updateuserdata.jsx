import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function UpdateUser() {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [password, setPassword] = useState(''); // New state for password
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(`http://localhost:3001/getusers/${id}`)
            .then(response => {
                const { name, email, age, password } = response.data;
                setName(name);
                setEmail(email);
                setAge(age);
                setPassword(password);  // Add this line to set the password
            })
            .catch(error => console.log(error));
    }, []);
    
    const handleUpdate = (e) => {
        e.preventDefault();
        console.log("Updating with data:", { name, email, age, password });
    
        axios.put(`http://localhost:3001/updateUsers/${id}`, { name, email, age, password })
            .then(response => {
                console.log(response);
                navigate('/Home');
            })
            .catch(error => console.log(error));
    }
    
    
    return (
        <div className="form-container">
            <div className='register-form '>
                <form onSubmit={handleUpdate}>
                    <h2>Update Your Data</h2>
                    <div className="mb-2">
                        <label htmlFor="name">Name </label>
                        <input type="text" id="name" placeholder="Enter Name" className="form-control"
                            value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="email">Email </label>
                        <input type="text" id="email" placeholder="Enter Email" className="form-control"
                            value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="age">Age </label>
                        <input type="text" id="age" placeholder="Enter Age" className="form-control"
                            value={age} onChange={(e) => setAge(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="password">Password </label>
                        <input type="password" id="password" placeholder="Enter Password" className="form-control"
                            value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" className="form-field">Update</button>
                </form>
            </div>
        </div>
    );
}
export default UpdateUser;