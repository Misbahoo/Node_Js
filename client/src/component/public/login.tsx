import Axios from "axios";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const milliseconds = 3600000;
  localStorage.setItem("twoHours", JSON.stringify(milliseconds));
  const userRef = useRef();
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);
  const [keyCode, setKeyCode] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrorMessage("");
  }, [input]);

  useEffect(() => {
    document.body.addEventListener("keydown", keyDown);
  }, []);

  async function keyDown(event: any) {
    if (event.code === "Enter") {
      try {
        const data = await Axios.post("http://localhost:3500/examAuth", {
          login: input,
        });
        setError(false);
        setErrorMessage("");
        navigate("/examSection", { state: { user: data.data } });
      } catch (error: any) {
        setError(true);
        setErrorMessage(error.response.data.message);
        console.log(error);
      }
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const data = await Axios.post("http://localhost:3500/examAuth", {
        login: input,
      });
      setError(false);
      navigate("/examSection", { state: { user: data.data } });
      setErrorMessage("");
    } catch (error: any) {
      setError(true);
      setErrorMessage(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <>
      <div className="">
        <div className="w-1/6 mx-auto mt-10">
          <img src="images/editedConst.png" alt="" />
        </div>
        <form onSubmit={handleSubmit}>
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
              onKeyDown={keyDown}
              required
            />
            {error && (
              <p className="mt-1 mx-auto w-2/4 text-red-500">{errorMessage}</p>
            )}
          </div>
          <div className="flex justify-center w-2/4 mx-auto mt-8">
            <button type="submit" className="btn shadow shadow-yellow-800">
              Log In
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default LogIn;
