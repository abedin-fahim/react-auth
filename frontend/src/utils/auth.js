import { redirect } from "react-router-dom";

export const getTokenDuration = () => {
  const storedExpirationDate = localStorage.getItem('expiration');
  const expirationDate = new Date(storedExpirationDate);

  const currentDate = new Date();

  const remainingDuration = expirationDate.getTime() - currentDate.getTime();

  return remainingDuration;
}

export const getAuthToken = () => {
  const token = localStorage.getItem('token')

  if (!token) {
    return null;
  }

  const tokenDuration = getTokenDuration();

  if (tokenDuration < 0) {
    return 'EXPIRED';
  }

  return token;
}

export const tokenLoader = () => {
  return getAuthToken();
}

export const checkAuthLoader = () => {
  const token = getAuthToken();

  if (!token) {
    return redirect('/auth');
  }

  return null;
}