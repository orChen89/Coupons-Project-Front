import './SignUp.css';
import { Link } from 'react-router-dom';

export function SignUp() {
  return (
    <Link to='/registration'>

      <button className='signUp'>Sign Up</button>

    </Link>
  );
}