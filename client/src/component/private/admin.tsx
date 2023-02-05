import Axios from "axios";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  const userRef = useRef();

  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleLogIn = async () => {
    try {
      const { data } = await Axios.post(
        "http://localhost:3500/adminAuth",
        input
      );
      if (data.length > 0) {
        navigate("/adminSection", { state: { data: data } });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    userRef.current.focus();
  }, []);
  return (
    <>
      <div className="w-full mx-auto">
        <div className="flex flex-col w-2/4 mx-auto shadow shadow-gray-500 rounded-md mt-10 p-8 gap-3">
          <div className="w-2/6 mx-auto mt-10">
            <img src="images/editedConst.png" alt="" />
          </div>
          <label htmlFor="logIn" className="w-3/4 mx-auto text-yellow-700">
            Email
          </label>
          <input
            className="input w-3/4"
            ref={userRef}
            type="email"
            name="loginAdmin"
            value={input.email}
            placeholder="Email Address"
            onChange={(e) =>
              setInput({ ...input, email: e.target.value.trim().toLowerCase() })
            }
          />
          <label htmlFor="logIn" className="w-3/4 mx-auto text-yellow-700">
            Password
          </label>
          <input
            className="input w-3/4"
            type="password"
            name="loginAdmin"
            value={input.password}
            placeholder="Password"
            onChange={(e) =>
              setInput({ ...input, password: e.target.value.trim() })
            }
          />
          <div className="flex flex-col w-3/4 mx-auto justify-center items-center mb-10">
            <button className="btn mb-5" onClick={handleLogIn}>
              Log in
            </button>
            <button
              className="text-yellow-900 hover:scale-125 transition duration-500"
              onClick={() => navigate("/registerAdmin")}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
