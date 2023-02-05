import Axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterAdmin = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    try {
      const data = await Axios.post("http://localhost:3500/admin", input);
      setInput({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });

      setSuccess(true);
      setSuccessMessage(data.data.message);
      console.log(data.data.message);
    } catch (error) {
      setSuccess(false);
      console.log(error);
    }
  };
  return (
    <>
      <div className="flex flex-col w-2/4 mx-auto p-3 bg-yellow-500 my-10">
        <p className="w-3/4 mx-auto text-xl mt-10 mb-5">Register Admin</p>
        <div className="flex flex-col w-3/4 mx-auto p-3">
          <label htmlFor="firstName" className="text-yellow-900">
            First Name
          </label>
          <input
            className="input w-full p-3"
            type="text"
            name="firstName"
            value={input.firstName}
            placeholder="First Name"
            onChange={(e) =>
              setInput({ ...input, firstName: e.target.value.trim() })
            }
          />
        </div>
        <div className="flex flex-col w-3/4 mx-auto p-3">
          <label htmlFor="lastName" className="text-yellow-900">
            Last Name
          </label>
          <input
            className="input w-full p-3"
            type="text"
            name="lastName"
            value={input.lastName}
            placeholder="Last Name"
            onChange={(e) =>
              setInput({ ...input, lastName: e.target.value.trim() })
            }
            autoComplete="off"
            autoSave="off"
          />
        </div>
        <div className="flex flex-col w-3/4 mx-auto p-3">
          <label htmlFor="email" className="text-yellow-900">
            Email-Address
          </label>
          <input
            className="input w-full p-3"
            type="email"
            name="email"
            value={input.email}
            placeholder="Email Address"
            onChange={(e) =>
              setInput({ ...input, email: e.target.value.trim() })
            }
          />
        </div>
        <div className="flex flex-col w-3/4 mx-auto p-3">
          <label htmlFor="password" className="text-yellow-900">
            Password
          </label>
          <input
            className="input w-full p-3"
            type="password"
            name="password"
            value={input.password}
            placeholder="Password"
            onChange={(e) =>
              setInput({ ...input, password: e.target.value.trim() })
            }
          />
        </div>
        <div className="flex flex-col justify-center items-center w-3/4 mx-auto mb-5">
          <button className="btn mb-5" onClick={handleSubmit}>
            Register
          </button>
          {successMessage && <div className="">{successMessage}</div>}
          <button
            className="text-yellow-900 hover:scale-125 transition duration-500"
            onClick={() => navigate("/admin")}
          >
            Log in
          </button>
        </div>
      </div>
    </>
  );
};

export default RegisterAdmin;
