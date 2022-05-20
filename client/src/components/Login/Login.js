import React, { useState } from 'react';
import { validateEmail, checkPassword } from '../../utils/helper';
import { Link } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    // const [userName, setUserName] = useSate(''); ** needs api call to the server side to generate the username greeting 
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputUpdate = (e) => {
        // Getting the value and name of the input which triggered the change
        const { target } = e;
        const inputType = target.name; //name of the input field, it can be anything you want
        const inputValue = target.value;
    
        
        if (inputType === 'emailAddress') {
          setEmail(inputValue);
  
        } else {
          setPassword(inputValue)
        }
      };
    
      const handleLoginSubmit = (e) => {
        e.preventDefault();
    
        if (!validateEmail(email)) {
          setErrorMessage('Email is invalid');
          return;
        }
        if (!checkPassword(password)) {
          setErrorMessage(
            `Choose a more secure password for the account: ${email}`
          );
          return;
        }
        //clears fields after an error
        setPassword('');
        setEmail('');
        setErrorMessage('');
        alert(`Hello ${email}`);
      }; // {userName} needs an api call to the back end after login
    return (
        <div> 
            <p>Hello UserName </p> 
            <form className="form">
                <label>Email</label>
                <input value={email}
                name='emailAddress'
                onChange={handleInputUpdate}
                type="text"
                placeholder="email Address" 
                />
                <label>Password</label>
                <input value={password}
                name="password"
                type="password"
                onChange={handleInputUpdate}
                placeholder="password" 
                />
                <button type="button" onClick={handleLoginSubmit}>Login</button>
            </form>
            <div>
                <Link to="/register" >Register</Link>
            </div>
            {errorMessage && (
        <div>
          <p className="error-text">{errorMessage}</p>
        </div>
      )}
        </div>
    );
}

export default Login;