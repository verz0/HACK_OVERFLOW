    import { Navigate } from "react-router-dom"
    

    const Authroute=({children})=>{
        const user=JSON.parse(localStorage.getItem('user'))
    if(user){
    return <Navigate to='/Dashboard' replace />
    }

    return children
    }

    export default Authroute