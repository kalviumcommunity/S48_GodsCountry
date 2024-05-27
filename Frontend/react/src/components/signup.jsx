import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function CreateUser() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        passwordMatch: "",
        age: "",
        password: ""
    });
    const navigate = useNavigate();

    const isEmailValid = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Reset errors
        setErrors({
            name: "",
            email: "",
            passwordMatch: "",
            age: "",
            password: ""
        });

        const newErrors = {};

        // Check if name is empty or has at least 3 letters
        if (!name.trim() || name.trim().length < 3) {
            newErrors.name = "Name cannot be empty and must have at least 3 letters";
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            newErrors.passwordMatch = "Passwords do not match";
        }

        // Check if the email is in a valid format
        if (!isEmailValid(email)) {
            newErrors.email = "Invalid email format";
        }

        // Check if age is more than 3
        if (isNaN(age) || parseInt(age) <= 3) {
            newErrors.age = "Age must be a number greater than 3";
        }

        // Check if password is between 4 and 10 characters
        if (password.length < 4 || password.length > 10) {
            newErrors.password = "Password must be between 4 and 10 characters";
        }

        // If there are errors, log to console and set them
        if (Object.keys(newErrors).length > 0) {
            console.error("Validation errors:", newErrors);
            setErrors(newErrors);
            return;
        }

        // Create user object
        const newUser = { name, email, age, password };

        // Send the user data to the server
        axios.post("http://localhost:3000//createUser", newUser)
            .then(result => {
                console.log(result);
                navigate('/Loginpage');
            })
            .catch(err => {
                console.error(err);
            });
    }

    return (
        <div className="form-container ">
            <div className='register-form'>
                <form onSubmit={handleSubmit}>
                    <h2>Sign up</h2>
                    <div className="mb-2">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" placeholder="Enter Name" className="form-control"
                            onChange={(e) => setName(e.target.value)} />
                        {errors.name && <div className="text-danger">{errors.name}</div>}
                    </div>
                    <div className="mb-2">
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" placeholder="Enter Email" className="form-control"
                            onChange={(e) => setEmail(e.target.value)} />
                        {errors.email && <div className="text-danger">{errors.email}</div>}
                    </div>
                    <div className="mb-2">
                        <label htmlFor="age">Age</label>
                        <input type="text" id="age" placeholder="Enter Age" className="form-control"
                            onChange={(e) => setAge(e.target.value)} />
                        {errors.age && <div className="text-danger">{errors.age}</div>}
                    </div>
                    <div className="mb-2">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder="Enter Password" className="form-control"
                            onChange={(e) => setPassword(e.target.value)} />
                        {errors.password && <div className="text-danger">{errors.password}</div>}
                    </div>
                    <div className="mb-2">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password" id="confirmPassword" placeholder="Confirm Password" className="form-control"
                            onChange={(e) => setConfirmPassword(e.target.value)} />
                        {errors.passwordMatch && <div className="text-danger">{errors.passwordMatch}</div>}
                    </div>
                    <button type="submit" className="form-field">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default CreateUser;