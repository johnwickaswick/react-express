import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';

import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import AddReactionIcon from '@mui/icons-material/AddReaction';

if(import.meta.env.DEV) {
  axios.defaults.baseURL = `http://localhost:${import.meta.env.VITE_PORT}`;
} else {
  axios.defaults.baseURL = location.origin;
}

function App() {

  const [data, setData] = useState({});

  useEffect(() => {
    (async () => {
      let res = await axios.get("/data");
      setData(res.data);
    })()
  },[]);

  return (
    <>
    <h1>{data.msg}</h1>
    <Stack spacing={1}>
      <AddReactionIcon color="success" scale={10} />
      <Rating name="half-rating" defaultValue={2.5} precision={0.2}  />
      <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
    </Stack>
    </>
  )
}

export default App
