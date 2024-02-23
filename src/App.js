import logo from './logo.svg';
import './App.css';
import { Outlet, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Token from './pages/Token';
function App() {
  const token = localStorage.getItem("token")
  Token(token);
  return (
     <>
       <ToastContainer/>
       <main className='main'>
            <Outlet/>
       </main>
     </>
  );
}

export default App;
