import React, { useState } from 'react';
import { validateEmail, checkPassword, checkUserName } from '../../utils/helper';

function Register() {
    const[firstName, setFirstName] = useState('');
    const[lastName, setLastName] = useState('');
    const[userName, setUserName] = useState('');
    const[emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleRegistrationInput = (e) => {
        const { target } = e;
        const inputType = target.name;
        const inputValue = target.value;
        
        switch(inputType) {
            case 'firstName': 
                setFirstName(inputValue);
                break;
            case 'lastName':
                setLastName(inputValue);
                break;
            case 'userName':
                setUserName(inputValue);
                break;
            case 'emailAddress':
                setEmailAddress(inputValue);
                break;
            case 'password':
                setPassword(inputValue);
                break;
            case 'verifyPassword':
                setVerifyPassword(inputValue);
                break;
            default: 
            break;
        }
    }
    const handleRegistrationValidate = (e) => {
        const { target } = e;
        const inputType = target.name;
        const inputValue = target.value;
    if (inputType === 'emailAddress') {
            if (!validateEmail(inputValue)) {
                setErrorMessage('invalid email');
                return;
            }
        }
        if (inputType === 'userName') {
            if (!checkUserName(inputValue)) {
                setErrorMessage('invalid Username')
                return
            }
        }
        if (inputType === 'password') {
            if (!checkPassword(inputValue)) {
                setErrorMessage('must be all letters no number or symbols');
                return;
            }
        }
        if (inputType === 'verifyPassword') {
            if (inputValue !== password) { //password is the object and input val is the verify object 
                setErrorMessage('passwords must match');
                return;
            } 
        }
        setErrorMessage(''); 
    };
    return (
        <div>
            <form>
                <h3>Register Here:</h3>
                <label>First Name</label>
                <input value={firstName}
                name='firstName'
                onChange={handleRegistrationInput}
                type='text'
                placeholder='First Name' />
                <label>Last Name</label>
                <input value={lastName}
                name='lastName'
                onChange={handleRegistrationInput}
                type='text'
                placeholder='Last Name' />
                <label>Username</label>
                <input value={userName}              
                name='userName'
                onChange={handleRegistrationInput}
                onKeyUp={handleRegistrationValidate}
                type='text'
                placeholder='Username' />
                <label>Email</label>
                <input value={emailAddress}              
                name='emailAddress'
                onChange={handleRegistrationInput}
                onKeyUp={handleRegistrationValidate}
                type='text'
                placeholder='Email Address' />
                <label>Password</label>
                <input value={password}
                name='password'
                onChange={handleRegistrationInput}
                onKeyUp={handleRegistrationValidate} // runs the validation after you finish typing 
                type='password' //using password instead of text hides the text as it is being written
                placeholder='Password' />
                <label>Verify Password</label>
                <input value={verifyPassword}
                name='verifyPassword'
                onChange={handleRegistrationInput}
                onKeyUp={handleRegistrationValidate}
                type='password'
                placeholder='Verify Password' />
                <button type='button'> submit </button>
            </form>
            {errorMessage && (
        <div>
          <p className="error-text">{errorMessage}</p>
        </div>
      )}
        </div>
    )
}
export default Register;