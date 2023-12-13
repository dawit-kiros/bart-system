import React, { useEffect, useState } from "react";
import axios from "axios";
import { see, remove, change, search } from "../../Assets/index.js";
// import ModalForm  from "./UserForm.js";
// import Register from "../Register.js";
import UserForm from "./UserForm.js";
import UserService from "../../services/user.service";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [status, setStatus] = useState({});

  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");

  

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get("https://localhost:8080/api/users/all");

      setUsers(response.data.data);
    };
    fetchUsers();
  }, []);

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleDelete = (id) => {
    // alert(id)
    try {
      const response = UserService.deleteUser(id);
      setUsers(users.filter((user) => user._id !== id));
      console.log(response.data);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mx-4 my-8">
        <div className="w-1/3 relative">
          <input
            type="text"
            placeholder="Search"
            className="border-2 border-gray-400 rounded-md py-2 pl-12 pr-10 w-full"
            onChange={handleSearch}
          />
          <img
            src={search}
            alt="search"
            className="absolute top-2 left-2 pointer-events-none"
          />
        </div>
        <div>
          <button
            onClick={() => {
              setShowModal(true)
              setTitle("Add New User")
            }
            }
            className="bg-lime-500 hover:bg-lime-700 text-white font-bold py-2 px-8 rounded-md"
          >
            Add New
          </button>
          {showModal ? (
            <>
              <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <div className="flex items-start justify-between p-3 border-b border-solid border-gray-300 rounded-t ">
                      <h3 className=" text-sm  ">{title}</h3>
                      <button
                        className="bg-transparent border-0 text-black float-right"
                        onClick={() => setShowModal(false)}
                      >
                        <span className="text-black opacity-7 h-7 w-7 text-xl block bg-gray-300 py-0 rounded-full">
                          x
                        </span>
                      </button>
                    </div>
                    <div className="relative p-6 flex-auto">
                      <UserForm />
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>

      <table className="table-auto w-full">
        <thead>
          <tr className=" bg-gradient-to-r from-purple-600 to-blue-500  transition duration-300 text-white text-left ">
            <th className="px-4 py-2">S.No</th>
            <th className="px-4 py-2">Username</th>
            <th className="px-4 py-2">Email Address</th>
            <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={user._id}>
              <td className="shadow-sm px-4 py-0 ">{index + 1}</td>
              <td className="shadow-sm px-4 py-0">{user.username}</td>
              <td className="shadow-sm px-4 py-0">{user.email}</td>
              <td className="shadow-sm px-4 py-0">
                <ul>
                  {user.roles &&
                    user.roles.map((role, index) => (
                      <li key={index}>{role.name}</li>
                    ))}
                </ul>
              </td>

              <td className="shadow-sm px-4 py-0">
                <div className="flex flex-row justify-between gap-4 cursor-pointer w-4 h-4 ">
                  <img
                    src={change}
                    alt="change"
                    onClick={() => {
                      setShowModal(true)
                      setTitle("Edit User")
                    }
                    }
                  />
                  {/* <img src={see} alt="see" /> */}
                  <img
                    src={remove}
                    alt="remove"
                    onClick={() => handleDelete(user._id)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UsersTable;
