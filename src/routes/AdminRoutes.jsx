import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../context/AuthContext"

function AdminRoutes({ children }) {
    const navigate = useNavigate();
    const { currentUserAuth, isAdmin } = useAuthContext();
    
    useEffect(() => {
        const authAccess = async () => {
            const authUser = await currentUserAuth();
                if (authUser && !isAdmin) {
                    console.log(isAdmin)
                    navigate("/");
                }
          }
          authAccess();
    }, []);

    return children;
}

export default AdminRoutes;