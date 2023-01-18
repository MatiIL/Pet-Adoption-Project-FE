import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../context/AuthContext"

const UserRoutes = ({ children }) => {
  const { token } = useAuthContext();
  const navigate = useNavigate();
  return token ? children : navigate("/");
};

export default UserRoutes;