import { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import Swal from "sweetalert2";

export default function Middleware({ children }) {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [confirmed,setconfirmed]=useState(false)
  if (!isAuthenticated) {
    setTimeout(() => {
      Swal.fire({
        title: " ابتدا باید وارد شوید ",
        icon: "error",
        confirmButtonText: "باشه",
      }).then((result) => {
        if (result.isConfirmed) {
          
        }
      });
    }, 10);
    
      return <Navigate to="/auth/login" replace />;
    
    
  } else {
    return children;
  }
}
