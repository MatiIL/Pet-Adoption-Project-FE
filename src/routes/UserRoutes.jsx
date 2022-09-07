import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../context/AuthContext"

function UserRoutes({ children }) {
  const navigate = useNavigate();
  const { currentUserAuth, token } = useAuthContext();

  useEffect(() => {
    const authAccess = async () => {
      const authUser = await currentUserAuth();
      if (authUser.data) {
        if (!token) navigate('/');
      } 
    }
    authAccess();
  }, []);

  return children;
}

export default UserRoutes;