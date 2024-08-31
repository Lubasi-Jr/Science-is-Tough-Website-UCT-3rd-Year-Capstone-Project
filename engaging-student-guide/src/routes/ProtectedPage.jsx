import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import App from '../App';

const ProtectedPage = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to='/login' replace />;
  }

  return <App />;
};

export default ProtectedPage;