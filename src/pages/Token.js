// useTokenRedirect.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Token = (token) => {
  const navigate = useNavigate(); 

  useEffect(() => {
    if (!token) {
      navigate("/sign-in");
    } else {
      navigate("/user-profile");
    }
  }, [token, navigate]);
};

export default Token;
