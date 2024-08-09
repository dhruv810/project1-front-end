import './App.css';
import { Login } from './components/login/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './components/homePage/HomePage';

import { CreateReimbursement } from './components/reimbursementView/createReimbursement/CreateReimbursement';
import { CreateAccount } from './components/login/creteAccount/CreateAccount';
import { EditReimbursement } from './components/reimbursementView/editReimbursement/EditReimbursement';
import { ManagerReimbusementView } from './components/reimbursementView/managerView/ManagerReimbusementView';
import { ManagerUserView } from './components/userView/ManagerUserView/ManagerUserView';

function App() {

  return (
   <>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login /> } />
                                      
        <Route path="/home" element={<HomePage /> } />

        <Route path="/create-reimbursement" element={<CreateReimbursement/>} />
        <Route path="/create-account" element={<CreateAccount/>} />
        <Route path="/description" element={<EditReimbursement/>} />
        <Route path="/manager" element={<ManagerReimbusementView/>} />
        <Route path="/manage-user" element={<ManagerUserView/>} />

        <Route path='/*' element={<h1>404! Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
   </>
  );
}

export default App;
