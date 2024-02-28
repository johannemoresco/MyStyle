import './App.css'
import SignIn from './components/auth/Signin';
import './App.css';
//import SignIn from './components/auth/Signin';
import SignUp from './components/auth/Signup';
import Notification from './pages/notifications';
import Upload from './pages/upload';
function App() {
  return (
    <div className="App">
      <SignUp/>
    </div>
  );
}

export default App;
