import React, { useState } from 'react';
import './App.css';
import { Login } from './components/login/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './components/homePage/HomePage';
import { User } from './interface/User';

function App() {

  const [user, setUser] = useState<User | null>(null);
  return (
   <>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login 
                                          user={user} 
                                          setUser={setUser}
                                        /> } />
                                      
        <Route path="/home" element={<HomePage
                                     user={user}
                                     setUser={setUser}
                                    /> } />


        <Route path='/*' element={<h1>404! Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
   </>
  );
}

export default App;
