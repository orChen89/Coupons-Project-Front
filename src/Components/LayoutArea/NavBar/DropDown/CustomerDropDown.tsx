import { useState } from "react";
import { Link } from "react-router-dom";
import './CustomerDropDown.css';
import { CustomerItems } from "../Items/Items";

function CustomerDropDown() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  return (
    <>
      <ul
        onClick={handleClick}
        className={click ? 'dropdown-menu clickedCustomer' : 'dropdown-menuCustomer'}
      >
        {CustomerItems.map((item, index) => {
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

export default CustomerDropDown;