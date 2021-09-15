import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import Landscape from '../assets/images/landscape.jpg';

const cookies = new Cookies();
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const initialState = {
  fullName: '',
  username: '',
  password: '',
  confirmPassword: '',
  phoneNumber: '',
  avatarURL: '',
};

const Auth = () => {
  const [form, setForm] = useState(initialState);
  const [isSignUp, setIsSignUp] = useState(true);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const changeAuth = (e) => {
    setIsSignUp((prevSignUp) => !prevSignUp);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // * FORM DATA
    const { username, password, phoneNumber, avatarURL } = form;

    // * REQUEST URL
    const URL = SERVER_URL;

    // * RESPONSE DATA DEPENDING ON isSignUp
    const { data } = await axios.post(`${URL}/${isSignUp ? 'signup' : 'login'}`, {
      username,
      password,
      phoneNumber,
      avatarURL,
      fullName: form.fullName,
    });

    const { token, userId, hashedPassword, fullName } = data;

    // * STORE DATA IN COOKIES
    cookies.set('token', token);
    cookies.set('username', username);
    cookies.set('fullName', fullName);
    cookies.set('userId', userId);

    if (isSignUp) {
      cookies.set('phoneNumber', phoneNumber);
      cookies.set('avatarURL', avatarURL);
      cookies.set('hashedPassword', hashedPassword);
    }

    // * RELOAD TO CHANGE AUTH STATUS IN APP COMPONENT
    window.location.reload();
  };

  return (
    <div className='auth'>
      <div className='auth__container'>
        <div className='auth__container-content'>
          <p>{isSignUp ? 'Sign Up' : 'Sign In'}</p>
          <form onSubmit={(e) => handleSubmit(e)} className='auth__form'>
            <div className='auth__form-input-container'>
              <label htmlFor='username'>Username</label>
              <input
                name='username'
                type='text'
                placeholder='Username'
                onChange={(e) => handleChange(e)}
                required
              />
            </div>

            {isSignUp && (
              <>
                <div className='auth__form-input-container'>
                  <label htmlFor='fullName'>Full Name</label>
                  <input
                    name='fullName'
                    type='text'
                    placeholder='Full Name'
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </div>
                <div className='auth__form-input-container'>
                  <label htmlFor='phoneNumber'>Phone Number</label>
                  <input
                    name='phoneNumber'
                    type='text'
                    placeholder='Phone Number'
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </div>
                <div className='auth__form-input-container'>
                  <label htmlFor='avatarURL'>Avatar URL</label>
                  <input
                    name='avatarURL'
                    type='text'
                    placeholder='Avatar URL'
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </div>
              </>
            )}

            <div className='auth__form-input-container'>
              <label htmlFor='password'>Password</label>
              <input
                name='password'
                type='password'
                placeholder='Password'
                onChange={(e) => handleChange(e)}
                required
              />
            </div>

            {isSignUp && (
              <div className='auth__form-input-container'>
                <label htmlFor='confirmPassword'>Confirm Password</label>
                <input
                  name='confirmPassword'
                  type='password'
                  placeholder='Confirm Password'
                  onChange={(e) => handleChange(e)}
                  required
                />
              </div>
            )}

            <div className='auth__btn'>
              <button>{isSignUp ? 'Sign Up' : 'Sign In'}</button>
            </div>
          </form>
          <div className='auth__text'>
            <p>
              {isSignUp ? 'Already have an account?' : 'Dont have an account?'}
              <span onClick={(e) => changeAuth(e)}>{isSignUp ? 'Sign In' : 'Sign Up'}</span>
            </p>
          </div>
        </div>
      </div>
      <div className='auth__image-container'>
        <img src={Landscape} alt='sign in' />
      </div>
    </div>
  );
};

export default Auth;
