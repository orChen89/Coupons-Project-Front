import { useState } from "react";
import { Link } from "react-router-dom";
import { AdminItems } from "../Items/Items";
import './AdminDropDown.css';

function AdminDropDown() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  return (
    <>
      <ul
        onClick={handleClick}
        className={click ? 'dropdown-menuAdmin clickedAdmin' : 'dropdown-menuAdmin'}
      >
        {AdminItems.map((item, index) => {
          return (
            <li key={index}>
              <Link
                className={item.cName}
                to={item.path}
                onClick={() => setClick(false)}
              >
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default AdminDropDown;