import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../../hooks/useRefreshToken";
import useAuth from "../../hooks/useAuth";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true)
    const refresh = useRefreshToken()
    const { auth } = useAuth()

    useEffect(() => {
        const verifyRefreshTpken = async () =>{ 
            try{
                await refresh()
            }
            catch(err){
                console.error(err)
            }
            finally{
                setIsLoading(false)
            }
        }

        !auth?.accessToken ? verifyRefreshTpken() : setIsLoading(false)
        
    }, [])

    return(
        <>
            {isLoading
                ? <p>Loading...</p>
                : <Outlet />
            }
        </>
    )
}

export default PersistLogin