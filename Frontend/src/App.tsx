import './index.css'
import { Route , Routes , BrowserRouter } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Dashboard } from './pages/Dashboard'
import { SendMoney } from './pages/Sendmoney'
import {Home} from "./pages/Home"
import { Toaster } from "@/components/ui/sonner";

function App() {
  

  return (
    <div className=' h-screen w-full'>
      <BrowserRouter>

      
    <Routes>


     <Route path="/" element={<Home />} />
     <Route path='/signup' element={<Signup/>} />
     <Route path='/signin' element={<Signin/>} />
     <Route path='/dashboard' element={<Dashboard/>} />
     <Route path='/sendMoney' element={<SendMoney/>} />
     

      </Routes>
      <Toaster />
      
      </BrowserRouter>
    
    </div>
  )
}

export default App
