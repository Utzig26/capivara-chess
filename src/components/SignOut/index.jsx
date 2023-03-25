import authService from '../../api/auth.service';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

function Home() {
  const dispatch = useDispatch()
  authService.signOut(dispatch);
  
  return (
    <Navigate to="/home" />
  );
}

export default Home; 
