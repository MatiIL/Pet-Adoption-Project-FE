import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../context/AuthContext"

const AdminRoutes = ({ children }) => {
  const { isAdmin } = useAuthContext();
  const navigate = useNavigate();
  return isAdmin ? children : navigate("/");
};

export default AdminRoutes;