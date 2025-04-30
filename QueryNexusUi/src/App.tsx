
import { BrowserRouter,Routes,Route} from "react-router-dom" 
import Auth from "./Components/Auth"
import Testing from "./pages/Testing"
import Temp from "./pages/Temp"

const  App :React.FC= () => {
 
  return (<BrowserRouter>
<Routes>
  <Route path='/' element={<Auth/>}></Route>
  <Route path='temp/testing/:webId' element ={<Testing/>}></Route>
  <Route path='/temp' element ={<Temp/>}></Route>

</Routes>
  </BrowserRouter>
  
   
    
      
   
  )
}

export default App
