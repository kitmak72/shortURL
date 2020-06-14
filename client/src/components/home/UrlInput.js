import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import axios from 'axios';
import UrlResult from './UrlResult';

function UrlInput() {
  const { isAuth, token } = useContext(GlobalContext);
  const [origin, setOrigin] = useState('');
  const [short, setShort] = useState('');
  const [ending, setEnding] = useState('');
  const [useEnding, setUseEnding] = useState(false);
  const [error, setError] = useState(null);
  const [urlFromButton, setUrlFromButton] = useState('');

  useEffect(() => {
    if (urlFromButton !== '') {
      const config = {
        headers: {
          'Content-type': 'application/json',
          'x-auth-token': token
        }
      };

      axios
        .post(
          '/api/url',
          {
            origin: urlFromButton,
            urlCode: useEnding ? ending : ''
          },
          config
        )
        .then(res => {
          setShort(res.data.url.short);
          setError(null);
        })
        .catch(err => setError(err.response.data.message));
    }
  }, [urlFromButton]);

  return (
    <div className="url-input-form">
      <label htmlFor="basic-url">Shorten your URL | Log URL stats</label>
      {error ? (
        <h5 className="error text-warning text-center">{error}</h5>
      ) : null}

      <div className="input-group input-group-lg">
        <input
          type="text"
          placeholder="place your long URL here"
          className="form-control"
          id="basic-url"
          aria-describedby="basic-addon3"
          value={origin}
          onChange={e => setOrigin(e.target.value)}
        />
        <div className="input-group-append">
          <button
            onClick={() => setUrlFromButton(origin)}
            className="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
          >
            Shorten
          </button>
        </div>
      </div>

      <div className="input-group mb-3" id="url_ending">
        <div className="input-group-prepend">
          <div className="input-group-text">
            <input
              type="checkbox"
              aria-label="Checkbox for following text input"
              disabled={!isAuth}
              onClick={() => setUseEnding(!useEnding)}
            />
          </div>
        </div>
        <input
          type="text"
          className="form-control"
          aria-label="Text input with checkbox"
          maxLength="20"
          disabled={!isAuth}
          placeholder={
            isAuth
              ? 'Customize your URL ending here'
              : 'Login to use a customize ending'
          }
          value={ending}
          onChange={e => setEnding(e.target.value)}
        />
      </div>

      {short === '' ? null : <UrlResult short={short} />}
    </div>
  );
}

export default UrlInput;
