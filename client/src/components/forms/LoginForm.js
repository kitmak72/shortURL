import React, { useContext } from 'react';
import { Formik, Form, Field } from 'formik';
import { Link, Redirect } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalState';

const initialValues = {
  email: '',
  password: ''
};

function LoginForm(props) {
  const { login, error, isAuth } = useContext(GlobalContext);

  function onSubmit(values) {
    login(values.email, values.password, () => {
      props.history.push('/');
    });
  }

  if (isAuth) {
    return <Redirect to={{ pathname: '/', state: { from: props.location } }} />;
  } else {
    return (
      <div className="container">
        <h2 className="text-center">Login</h2>
        {error ? <div className="text-danger text-center">{error}</div> : null}

        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          <Form>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field
                type="email"
                name="email"
                className="form-control"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field
                type="password"
                name="password"
                className="form-control"
                required
              />
            </div>

            <div className="form-action">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
              <span>
                Don't have an account yet?
                <Link to="/signup">Sign up here</Link>
              </span>
            </div>
          </Form>
        </Formik>
      </div>
    );
  }
}

export default LoginForm;
