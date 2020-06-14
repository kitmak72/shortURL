import React, { createContext, useReducer } from 'react';
import axios from 'axios';
import AppReducer from '../reducers/AppReducer';

const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuth: false,
  isLoading: false,
  error: null
};

export const GlobalContext = createContext(initialState);

export function GlobalProvider({ children }) {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  async function loadUser() {
    dispatch({ type: 'USER_LOADING' });

    let config = {
      headers: {
        'Content-type': 'application/json'
      }
    };

    if (state.token) config.headers['x-auth-token'] = state.token;

    try {
      const res = await axios.get('/user/profile', config);
      dispatch({ type: 'USER_LOADED', payload: { user: res.data.user } });
    } catch (error) {
      dispatch({ type: 'USER_LOAD_ERROR' });
    }
  }

  async function signUp(email, firstName, lastName, password, cb) {
    try {
      const res = await axios.post('/auth/signup', {
        email,
        firstName,
        lastName,
        password
      });
      dispatch({
        type: 'SIGNUP_SUCCESS',
        payload: { token: res.data.token, user: res.data.user }
      });
      cb();
    } catch (error) {
      dispatch({ type: 'AUTH_ERROR', payload: error.response.data.message });
    }
  }

  async function login(email, password, cb) {
    try {
      const res = await axios.post('/auth/login', { email, password });
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { token: res.data.token, user: res.data.user }
      });
      cb();
    } catch (error) {
      dispatch({ type: 'AUTH_ERROR', payload: error.response.data.message });
    }
  }

  function logout(cb) {
    dispatch({ type: 'LOGOUT_SUCCESS' });
    cb();
  }

  return (
    <GlobalContext.Provider
      value={{
        user: state.user,
        token: state.token,
        isAuth: state.isAuth,
        isLoading: state.isLoading,
        error: state.error,
        login,
        signUp,
        logout,
        loadUser
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
