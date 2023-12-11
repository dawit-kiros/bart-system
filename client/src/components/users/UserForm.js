import React from "react";

function UserForm() {
  return (
    <form>
      <div className="bg-grey-lighter flex flex-col">
        <div className="container max-w-md mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-8 py-4 rounded shadow-md text-black w-full">
            <h3 className="mb-8 text-sm text-center">Add New User </h3>
            <input
              type="text"
              className="block border border-grey-light py-1 w-full p-3 rounded mb-4"
              name="firstName"
              placeholder="First Name"
            />
                  

            <input
              type="text"
              className="block border border-grey-light py-1  w-full p-3 rounded mb-4"
              name="email"
              placeholder="Email"              
            />

            <input
              type="password"
              className="block border border-grey-light py-1  w-full p-3 rounded mb-4"
              name="password"
              placeholder="Password (5 characters and above)"
            />

            

            <button
              type="submit"
              className="w-full text-center py-1 rounded bg-lime-500 text-white hover:bg-lime focus:outline-none my-1"
            >
              Add 
            </button>

            
          </div>

          
        </div>
      </div>
    </form>
  );
}

export default UserForm;
// jj