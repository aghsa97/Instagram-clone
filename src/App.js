import React, { Suspense, lazy} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import * as ROUTES from "./constents/routes"
import UserContext from './context/user';
import useAuthListener from './hooks/use-auth-listener';
import ReactLoader from './components/loader';


const Login = lazy(() => import ("./pages/login"))
const Signup = lazy(() => import ("./pages/sign-up"))
const NotFound = lazy(() => import ("./pages/not-found"))
const Dashboard = lazy(() => import ("./pages/dashboard"))
const Profile = lazy(() => import ("./pages/profile"))


function App() {
  const {user} = useAuthListener();

  return (
    <UserContext.Provider value={{user}}>
      <Router>
      <Suspense fallback={<ReactLoader />}>
        <Routes>
          <Route path={ROUTES.LOGIN} exact element={user ? <Navigate replace to={ROUTES.DASHBOARD} /> : <Login/>}/>
          <Route path={ROUTES.SIGN_UP} exact element={user ? <Navigate replace to={ROUTES.DASHBOARD} /> : <Signup/>}/>
          <Route path={ROUTES.DASHBOARD} exact element={user ? <Dashboard user={user}/>: <Navigate replace to={ROUTES.LOGIN} />}/>
          <Route path={ROUTES.PROFILE} exact element={<Profile user={user}/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
