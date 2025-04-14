import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { loginSuccess, logout } from './redux/infoSlice';

export default function Middleware({children}){
    // const dispatch=useDispatch()
    // const [loading,setLoading]=useState(false)
    // const token=localStorage.getItem("access_token")
    // useEffect(() => {
    //     const checkAuth = async () => {
    //       setLoading(true)
    //       try {
    //         const response = await fetch(`https://batbooks.liara.run/auth/who/`, {
    //           method: "GET",
    //           headers: {
    //             "Content-Type": "application/json",
    //             Authorization: `Bearer ${token}`,
    //           },
    //         });
    
    //         if (response.ok) {
    //           const data = await response.json();
    //           console.log("hi")
    //           dispatch(
    //             loginSuccess({
    //               user:data.user_info
    //             })
    //           );
    //         } else {
    //           dispatch(logout());
    //         }
    //       } catch (err) {
    //         console.error("Error:", err.message);
    //         dispatch(logout());
    //       }
    //       finally{
    //         setLoading(false)
    //       }
    //     };
    
    //     checkAuth();
    //   }, []);

      const {  isAuthenticated } = useSelector((state) => state.auth);

    console.log(isAuthenticated)
        if(!isAuthenticated){
            return <Navigate to="/auth/login" replace />;
        }
        else{
return(children)
        }
        
        
    }