import httpClient from '../httpClient/index';

const VITE_MORALIS_API_KEY = import.meta.env.VITE_MORALIS_API_KEY;

interface requestType {
  url: string;
  method: 'post' | 'get';
  body?: any;
  debug?: boolean;
}

export async function requestApi({
  url,
  method,
  body,
  debug = false,
}: requestType) {
  try {
    const response = await httpClient.request({
      url,
      method,
      body,
      headers: {
        'X-API-Key': VITE_MORALIS_API_KEY,
      },
      debug,
      contentType: 'application/json; charset=utf-8',
    });
    if (response.status === 200) {
      return response.data;
    } else {
      console.log('网络异常了:', response);
    }
  } catch (error) {
    console.log('net work error', error);
  }
}
