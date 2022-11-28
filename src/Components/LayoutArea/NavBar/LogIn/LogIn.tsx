import './LogIn.css';
import { Link } from 'react-router-dom';

export function LogIn() {
  return (

    <Link to="/login">
      <button className='log'>Log In </button>
    </Link>

  );
}