import React  from "react";
import {useNavigate} from 'react-router-dom';
const Temp:React.FC=()=>{
    const navigate=useNavigate();

    const handler=()=>{
        navigate('testing/67ea715ea38b86a485c29c24');
     }  
    return <>
   <button onClick={handler} className="bg-yellow-400">
    click 
   </button>
    
    </>
}
export default Temp;