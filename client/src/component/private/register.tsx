import { useState } from "react";
import Axios from "axios";

const Register = () => {
  const [resMessage, setResMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [input, setInput] = useState({
    firstName: "",
    surName: "",
    otherName: "",
    appNumber: "",
    state: "",
    localGovernment: "",
    phoneNumber: "",
    imgUrl: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const {
      firstName,
      surName,
      otherName,
      appNumber,
      state,
      localGovernment,
      phoneNumber,
      imgUrl,
    } = input;

    try {
      const response = await Axios.post(
        "http://localhost:3500/students",
        input
      );
      setSuccess(true);
      setResMessage(response.data);

      // clear input fields
      setInput({
        firstName: "",
        surName: "",
        otherName: "",
        appNumber: input.appNumber,
        state: "",
        localGovernment: "",
        phoneNumber: "",
        imgUrl: "",
      });
    } catch (error: any) {
      setSuccess(false);
      setResMessage(error.response.data.message);
    }
  };

  return (
    <>
      <div className="p-2 sm:w-3/4 md:w-2/4 mx-auto bg-yellow-500 my-10 shadow-sm shadow-gray-500 rounded-md">
        <p className="w-3/4 mx-auto mt-10 text-yellow-700 uppercase text-xl">
          Add New Student
        </p>
        <div className="flex flex-col gap-2 p-3 w-full">
          <label htmlFor="appNumber" className="text-yellow-900 w-3/4 mx-auto">
            Application Number
          </label>
          <input
            className="input w-3/4"
            type="text"
            value={input.appNumber}
            name="appNumber"
            placeholder="Application Number"
            onChange={(e) => setInput({ ...input, appNumber: e.target.value })}
            required
          />
        </div>
        <div className="flex flex-col gap-2 p-3 w-full">
          <label htmlFor="firstName" className="text-yellow-900 w-3/4 mx-auto">
            First Name
          </label>
          <input
            className="input w-3/4"
            type="text"
            value={input.firstName}
            name="firstName"
            placeholder="First Name"
            onChange={(e) =>
              setInput({
                ...input,
                firstName: e.target.value,
              })
            }
            required
          />
        </div>
        <div className="flex flex-col gap-2 p-3 w-full">
          <label htmlFor="surName" className="text-yellow-900 w-3/4 mx-auto">
            SurName
          </label>
          <input
            className="input w-3/4"
            type="text"
            value={input.surName}
            name="surName"
            placeholder="SurName"
            onChange={(e) => setInput({ ...input, surName: e.target.value })}
            required
          />
        </div>
        <div className="flex flex-col gap-2 p-3 w-full">
          <label htmlFor="otherName" className="text-yellow-900 w-3/4 mx-auto">
            Other Name
          </label>
          <input
            className="input w-3/4"
            type="text"
            value={input.otherName}
            name="otherName"
            placeholder="Other Name"
            onChange={(e) => setInput({ ...input, otherName: e.target.value })}
          />
        </div>
        <div className="flex flex-col gap-2 p-3 w-full">
          <label htmlFor="state" className="text-yellow-900 w-3/4 mx-auto">
            State
          </label>
          <input
            className="input w-3/4"
            type="text"
            value={input.state}
            name="state"
            placeholder="State"
            onChange={(e) => setInput({ ...input, state: e.target.value })}
            required
          />
        </div>
        <div className="flex flex-col gap-2 p-3 w-full">
          <label
            htmlFor="localGovernment"
            className="text-yellow-900 w-3/4 mx-auto"
          >
            Local Government
          </label>
          <input
            className="input w-3/4"
            type="text"
            value={input.localGovernment}
            name="localGovernment"
            placeholder="Local Government"
            onChange={(e) =>
              setInput({ ...input, localGovernment: e.target.value })
            }
            required
          />
        </div>
        <div className="flex flex-col gap-2 p-3 w-full">
          <label
            htmlFor="phoneNumber"
            className="text-yellow-900 w-3/4 mx-auto"
          >
            Phone Number
          </label>
          <input
            className="input w-3/4"
            type="text"
            value={input.phoneNumber}
            name="phoneNumber"
            placeholder="Phone Number"
            onChange={(e) =>
              setInput({ ...input, phoneNumber: e.target.value })
            }
            required
          />
        </div>
        <div className="flex flex-col gap-2 p-3 w-full">
          <label htmlFor="imgUrl" className="text-yellow-900 w-3/4 mx-auto">
            Upload Picture
          </label>
          <input
            className="mx-auto w-3/4"
            type="file"
            value={input.imgUrl}
            name="imgUrl"
            onChange={(e) => setInput({ ...input, imgUrl: e.target.value })}
          />
        </div>
        <div className="flex flex-col justify-center items-center my-8">
          <button type="submit" className="btn" onClick={handleSubmit}>
            Register
          </button>
          {resMessage && (
            <p
              className={
                success ? `text-green-600 text-xl` : `text-red-600 text-xl`
              }
            >
              {resMessage}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Register;
