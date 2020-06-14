import React, { useEffect, useContext, useState } from 'react';
import CountUp from 'react-countup';
import axios from 'axios';
import { GlobalContext } from '../../context/GlobalState';
import Pagination from '../common/Pagination';
import UrlTable from './UrlTable';

function Dashboard() {
  const { token } = useContext(GlobalContext);
  const [urls, setUrls] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const config = {
      headers: {
        'Content-type': 'application/json',
        'x-auth-token': token
      },
      cancelToken: source.token
    };
    const fetchURL = async () => {
      try {
        const res = await axios.get(`/user/url/?page=${page}`, config);
        setUrls(res.data.urls);
        total !== res.data.total && setTotal(res.data.total);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('request canceled', error);
        } else {
          console.log(error.response);
        }
      }
    };
    fetchURL();
    return () => source.cancel();
  }, [page, total]);

  function deleteURL(urlCode) {
    const config = {
      headers: {
        'Content-type': 'application/json',
        'x-auth-token': token
      }
    };
    axios
      .delete(`/api/url/${urlCode}`, config)
      .then(res => {
        setUrls(urls.filter(url => url.urlCode !== res.data.url.urlCode));
        setTotal(total - 1);
      })
      .catch(error => console.log(error));
  }

  return (
    <div className="container">
      <h2>
        <CountUp end={total} prefix="Total " />
      </h2>
      <UrlTable urls={urls} deleteURL={deleteURL} />
      <Pagination total={total} currentPage={page} setPage={setPage} />
    </div>
  );
}

export default Dashboard;
