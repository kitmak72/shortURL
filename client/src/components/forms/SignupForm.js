import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { object, string, ref } from 'yup';
import { Link, Redirect } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalState';
import ErrorAlert from '../common/ErrorAlert';

const initialValues = {
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  confirmPassword: ''
};

const validationSchema = object({
  email: string().email('Invalid email format').required('Required'),
  firstName: string().required('Required'),
  lastName: string().required('Required'),
  password: string()
    .min(8, 'Password must have at least 8 characters')
    .required('Required'),
  confirmPassword: string()
    .oneOf([ref('password'), null], 'Passwords do not match')
    .required('Required')
});

function SignupForm(props) {
  const { signUp, error, isAuth } = useContext(GlobalContext);

  function onSubmit(values) {
    signUp(
      values.email,
      values.firstName,
      values.lastName,
      values.password,
      () => {
        props.history.push('/');
      }
    );
  }

  if (isAuth) {
    return <Redirect to={{ pathname: '/', state: { from: props.location } }} />;
  } else {
    return (
      <div className="container">
        <h2 className="text-center">Sign Up</h2>
        {error ? <div className="text-danger text-center">{error}</div> : null}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form>
            <div className="form-group mb-4">
              <label htmlFor="email">Email</label>
              <Field
                type="email"
                name="email"
                placeholder="p.chan@example.com"
                className="form-control"
              />
              <ErrorMessage name="email" component={ErrorAlert} />
            </div>

            <div className="form-group mb-4">
              <label htmlFor="firstName">First Name</label>
              <Field
                type="text"
                name="firstName"
                placeholder="Peter"
                className="form-control"
              />
              <ErrorMessage name="firstName" component={ErrorAlert} />
            </div>

            <div className="form-group mb-4">
              <label htmlFor="lastName">Last Name</label>
              <Field
                type="text"
                name="lastName"
                placeholder="Chan"
                className="form-control"
              />
              <ErrorMessage name="lastName" component={ErrorAlert} />
            </div>

            <div className="form-group mb-4">
              <label htmlFor="password">Password</label>
              <Field
                type="password"
                name="password"
                placeholder="Password of at least 8 characters"
                className="form-control"
              />
              <ErrorMessage name="password" component={ErrorAlert} />
            </div>

            <div className="form-group mb-4">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <Field
                type="password"
                name="confirmPassword"
                placeholder="Input your password again"
                className="form-control"
              />
              <ErrorMessage name="confirmPassword" component={ErrorAlert} />
            </div>

            <div className="form-action">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
              <span>
                Have an account already? <Link to="/login">Login</Link>
              </span>
            </div>
          </Form>
        </Formik>
      </div>
    );
  }
}

export default SignupForm;
