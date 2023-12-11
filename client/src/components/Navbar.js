import React from "react";
import { demouser } from "../Assets/index";

const Navbar = ({ pagename }) => {
  // const [userInfo, setUserInfo] = useState([]);

  // useEffect(() => {
  //   axios.get("http://localhost:5000/api/users").then((response) => {
  //     setUserInfo(response.data.data);
  //     console.log(userInfo);
  //   });
  // }, []);

  return (
    <nav className="bg-white flex items-center justify-between h-20 px-8 shadow-sm">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold text-gray-500">{pagename}</h1>
      </div>
    </nav>
  );
};

export default Navbar;
