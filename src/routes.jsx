import { Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import SignOut from './components/SignOut'

function ContentRoutes() {

  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/home" element={<Home />} />
      <Route exact path="/signin" element={<SignIn />} />
      <Route exact path="/signup" element={<SignUp />} />
      <Route exact path="/404" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
      <Route exact path="/signout" element={<SignOut />} />
    </Routes>
  );
}

export default ContentRoutes;
