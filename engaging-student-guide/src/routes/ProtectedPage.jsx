import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import App from '../App';
/* restricts access to certain parts of the app.
  If the user is authenticated, it renders the protected content.
  Otherwise, it redirects unauthenticated users to the login page.
 */

const ProtectedPage = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to='/login' replace />;
  }

  return <App />;
};

export default ProtectedPage;