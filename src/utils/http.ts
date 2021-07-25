import axios from 'axios';

export const http = async (url:string) =>
  await axios({
    headers: {
      'content-type': null
    },
    method: 'GET',
    url
  });
