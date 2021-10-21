import jwt_decode from 'jwt-decode';
export const decodeJwt = (token) => {
  try {
    return jwt_decode(token);
  } catch (error) {
    console.log('🚀 ~ file: jwt.js ~ line 6 ~ decodeJwt ~ error', error);
  }
  return null;
};
