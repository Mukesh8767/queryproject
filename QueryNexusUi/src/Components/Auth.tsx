import {useAuth0} from "@auth0/auth0-react";


const  Auth :React.FC= () => {
  const {user,loginWithRedirect,isAuthenticated,logout}=useAuth0();
 console.log(user);
  return (
<>
       {isAuthenticated &&  user && <h1>helli {user.name}</h1> }
   
   {isAuthenticated ? (
    <button className="border bg-gray-500"  onClick={()=>logout()}>Logout</button>
   ):(
<button className="border bg-gray-500"onClick={()=>loginWithRedirect()}>Login with Redirect</button>
   )}
    
      
   </>
  )
}

export default Auth
