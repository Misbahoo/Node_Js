import Axios from "axios";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const userRef = useRef();
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrorMessage("");
  }, [input]);

  const handleSubmit = async () => {
    try {
      const data = await Axios.post("http://localhost:3500/examAuth", {
        login: input,
      });
      setError(false);
      navigate("/examSection", { state: { user: data.data } });
      setErrorMessage("");
    } catch (error: any) {
      setError(true);
      // setErrorMessage(error);
      console.log(error);
    }
  };

  return (
    <>
      <div className="">
        <div className="w-1/6 mx-auto mt-10">
          <img src="images/editedConst.png" alt="" />
        </div>
        <div className="flex flex-col gap-2 w-3/4 mx-auto mt-10">
          <label
            className="text-yellow-700 text-xl w-2/4 mx-auto"
            htmlFor="logIn"
          >
            Login
          </label>
          <input
            ref={userRef}
            className="input w-2/4 mx-auto"
            autoComplete="off"
            autoSave="off"
            type="text"
            value={input}
            name="login"
            placeholder="application number"
            onChange={(e) => setInput(e.target.value.trim().toUpperCase())}
            required
          />
          {error && (
            <p className="mt-1 mx-auto w-2/4 text-red-500">{errorMessage}</p>
          )}
        </div>
        <div className="flex justify-center w-2/4 mx-auto mt-8">
          <button
            className="btn shadow shadow-yellow-800"
            onClick={handleSubmit}
          >
            Log In
          </button>
        </div>
      </div>
    </>
  );
};

export default LogIn;
