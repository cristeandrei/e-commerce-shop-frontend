import React, {useState} from 'react';
import type {UserLoginDetails} from "../../types/userLoginDetails.ts";
import {useLoginMutation} from "../../services/shopApi.ts";
import {useNavigate} from "react-router";
import {setUserDetails} from "../../services/userSlice.ts";
import {useDispatch} from "react-redux";

function LoginForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState<UserLoginDetails>({
        username: '',
        password: ''
    });
    const [login, {isLoading, error, isSuccess}] = useLoginMutation()

    // Generic handler for all input changes
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;

        // Update only the specific field within the single state object
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        let loginResponse = await login(formData);

        if (isSuccess && loginResponse.data != undefined) {
            dispatch(setUserDetails(loginResponse.data));

            navigate('/');
        }
    };

    return (
        <div className="login-container">
            <h2>Login to Your Account</h2>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username" // Name matches the key in the state object
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password" // Name matches the key in the state object
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                {error && <p style={{color: 'red'}}>{JSON.stringify(error)}</p>}

                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Logging In...' : 'Login'}
                </button>
            </form>
        </div>
    );
}

export default LoginForm;
