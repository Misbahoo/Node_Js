import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Axios from "axios";

const DashBoard = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState();
  const { state } = useLocation();

  useEffect(() => {
    setUser(user);
  });

  console.log(state);
  return (
    <>
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 w-full lg:w-3/4 mx-auto mt-20 p-3">
        <div className="w-full md:w-2/4 lg:w-1/3 mx-auto flex flex-col flex-1 bg-yellow-200 items-center justify-center p-8 shadow-md shadow-gray-400">
          <div className="p-3 mb-5">
            <p>Add New a Student</p>
          </div>
          <button
            className="p-5 bg-yellow-500 rounded-md text-yellow-800"
            onClick={() => navigate("register")}
          >
            Register Student
          </button>
        </div>
        <div className="w-full md:w-2/4 lg:w-1/3 mx-auto flex flex-col flex-1 bg-yellow-200 items-center justify-center p-8 shadow-md shadow-gray-400">
          <div className="p-3 mb-5">
            <p>Search, Edit, and Delete Students from record</p>
          </div>
          <button
            className="p-5 bg-yellow-500 rounded-md text-yellow-800"
            onClick={() => navigate("searchUsers")}
          >
            Search Students
          </button>
        </div>
        <div className="flex flex-col flex-1 w-full md:w-2/4 lg:w-1/3 mx-auto bg-yellow-200 items-center justify-center p-8 shadow-md shadow-gray-400">
          <div className="p-3 mb-5">
            <p>View Student Result</p>
          </div>
          <button
            className="p-5 bg-yellow-500 rounded-md text-yellow-800"
            onClick={() => navigate("result", { state: { user: state } })}
          >
            View Result
          </button>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
