import { Toaster } from 'react-hot-toast';
import './App.css';
import SignupPage from './Components/Auth/SignupPage/SignupPage';
import HomePage from './Components/Home/HomePage';

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      {/* Home Page */}
      <HomePage />
    </>
  );
}

export default App;
