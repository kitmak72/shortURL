import React, { useState, useContext } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { GlobalContext } from '../../context/GlobalState';

Modal.setAppElement('#root');

const style = {
  content: {
    width: '50%',
    height: '20vh',
    marginLeft: 'auto',
    marginRight: 'auto'
  }
};

function AddUrlModal({ isOpen, setModalIsOpen, addURL }) {
  const { token } = useContext(GlobalContext);
  const [origin, setOrigin] = useState('');
  const [ending, setEnding] = useState('');
  const [error, setError] = useState(null);
  function shorten() {
    const config = {
      headers: {
        'Content-type': 'application/json',
        'x-auth-token': token
      }
    };

    axios
      .post('/api/url', { origin, urlCode: ending }, config)
      .then(res => {
        addURL(res.data.url);
        setError(null);
      })
      .catch(error => setError(error.response.data.message));
  }

  return (
    <Modal
      style={style}
      isOpen={isOpen}
      onRequestClose={() => setModalIsOpen(false)}
    >
      <button
        type="button"
        className="btn btn-danger mb-2"
        onClick={() => setModalIsOpen(false)}
      >
        &times;
      </button>

      {error ? (
        <h5 className="error text-warning text-center">{error}</h5>
      ) : null}

      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text" role="img" aria-label="link">
            &#128279;
          </span>
        </div>
        <input
          type="url"
          className="form-control"
          placeholder="Original URL"
          aria-label="original URL"
          value={origin}
          onChange={e => setOrigin(e.target.value)}
        />
      </div>

      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">Optional URL ending</span>
        </div>
        <input
          type="text"
          maxLength="20"
          aria-label="URL ending"
          className="form-control"
          value={ending}
          onChange={e => setEnding(e.target.value)}
        />
      </div>

      <button
        type="button"
        className="btn btn-primary btn-lg btn-block mt-2"
        onClick={shorten}
      >
        Shorten
      </button>
    </Modal>
  );
}

export default AddUrlModal;
