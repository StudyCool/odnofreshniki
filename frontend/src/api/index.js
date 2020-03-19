import axios                                   from 'axios';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '../constants';

const config = {
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-type': 'application/json',
  },
};

const axiosInstance = axios.create( config );


axiosInstance.interceptors.request.use( config => {
  config.headers.authorization = sessionStorage.getItem( ACCESS_TOKEN_KEY );
  return config;
} );

const authenticateUser = async (url, data) => {
  try {
    const response = await axiosInstance.post( url, data );
    const { data: { tokenPair } } = response;
    sessionStorage.setItem( ACCESS_TOKEN_KEY, tokenPair.accessToken );
    localStorage.setItem( REFRESH_TOKEN_KEY, tokenPair.refreshToken );
    return response;
  } catch (e) {
    throw e;
  }
};

export const loginUser = async data => authenticateUser( '/sign_in', data );
export const signUpUser = async data => authenticateUser( '/sign_up', data );


