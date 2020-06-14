import React, { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import { Link, withRouter } from 'react-router-dom';

function Nav(props) {
  const { user, isAuth, logout } = useContext(GlobalContext);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link to="/">
        <span className="navbar-brand">URL Shortener</span>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="nav-options">
          <div className="navbar-nav">
            {isAuth ? (
              <>
                <Link to="/dashboard" className="nav-item nav-link active">
                  {user.firstName + ' ' + user.lastName}
                </Link>
                <button
                  type="button"
                  className="nav-item btn btn-outline-warning"
                  onClick={() =>
                    logout(() => {
                      props.history.push('/');
                    })
                  }
                >
                  Logout
                </button>
              </>
            ) : null}
            {!isAuth ? (
              <>
                <Link to="/login" className="nav-item nav-link">
                  Login
                </Link>
                <Link to="/signup" className="nav-item nav-link">
                  Signup
                </Link>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default withRouter(Nav);
