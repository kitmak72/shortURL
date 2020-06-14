import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import LineChart from './LineChart';
import { useParams } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalState';
import DoughnutChart from './DoughnutChart';

function UrlStats() {
  const { urlCode } = useParams();
  const { token } = useContext(GlobalContext);
  const [dateOfAccess, setDateOfAccess] = useState({ date: [], values: [] });
  const [platform, setPlatform] = useState({ platform: [], values: [] });
  const [region, setRegion] = useState({ region: [], values: [] });

  useEffect(() => {
    const config = {
      headers: {
        'Content-type': 'application/json',
        'x-auth-token': token
      }
    };
    axios
      .get(`/user/url/meta/${urlCode}`, config)
      .then(res => {
        setDateOfAccess({
          date: Object.keys(res.data.meta.dateOfAccess),
          values: Object.values(res.data.meta.dateOfAccess)
        });
        setPlatform({
          platform: Object.keys(res.data.meta.platform),
          values: Object.values(res.data.meta.platform)
        });
        setRegion({
          region: Object.keys(res.data.meta.region),
          values: Object.values(res.data.meta.region)
        });
      })
      .catch(error => console.log(error));
  }, []);
  return (
    <div className="container">
      <LineChart
        labels={dateOfAccess.date}
        data={dateOfAccess.values}
        label={'click per date'}
        title={'Click Distribution'}
      />
      <br />
      <DoughnutChart
        labels={platform.platform}
        data={platform.values}
        label={"Visitors' Platform"}
        title={'Platform Distribution'}
      />
      <br />
      <DoughnutChart
        labels={region.region}
        data={region.values}
        label={"Visitors' Region"}
        title={'Region Distribution'}
      />
    </div>
  );
}

export default UrlStats;
