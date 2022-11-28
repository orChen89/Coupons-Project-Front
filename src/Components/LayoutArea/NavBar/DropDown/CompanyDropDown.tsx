import { useState } from "react";
import { Link } from "react-router-dom";
import { CompanyItems } from "../Items/Items";
import './CompanyDropDown.css';

function CompanyDropDown() {

  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  return (
    <>
      <ul
        onClick={handleClick}
        className={click ? 'dropdown-menuCompany clickedCompany' : 'dropdown-menuCompany'}
      >
        {CompanyItems.map((item, index) => {
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

export default CompanyDropDown;