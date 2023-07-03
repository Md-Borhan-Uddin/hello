import { useState } from "react";

function SubMenu({open}) {
    const [isOpen, setIsOpen] = useState(false);
  const showSubMenu = (e)=>{
    setIsOpen(!isOpen);
    
  }
  return (
    <ul id="dashboard-example" className={isOpen?"py-2 space-y-2":"hidden"}>
              <li>
                <a
                  href="#"
                  className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                >
                  All Reports
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                >
                  All Dashboards
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                >
                  Effectiveness Report
                </a>
              </li>
            </ul>
  )
}

export default SubMenu;