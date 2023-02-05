import { useLocation, useNavigate } from "react-router-dom";
import Axios from "axios";
import { useState } from "react";

const UpdateStudent = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { student } = state;
  const [input, setInput] = useState({
    studentId: student.studentId,
    firstName: student.firstName,
    surName: student.surName,
    otherName: student.otherName,
    state: student.state,
    localGovt: student.localGovt,
    phoneNumber: student.phoneNumber,
    imgUrl: student.imgUrl,
  });
  const handleUpdate = async (e: any) => {
    try {
      await Axios.put(`http://localhost:3500/${student.id}`, input);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div>
        <div className="flex flex-col w-2/4 mx-auto mt-10 gap-2">
          <label htmlFor="studentId">Application Number</label>
          <input
            type="text"
            value={input.studentId}
            name="studentId"
            placeholder="Application Number"
            className="input w-full"
            onChange={(e) => setInput({ ...input, studentId: e.target.value })}
          />
        </div>
        <div className="flex flex-col w-2/4 mx-auto mt-10 gap-2">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            value={input.firstName}
            name="firstName"
            placeholder="First Name"
            className="input w-full"
            onChange={(e) => setInput({ ...input, firstName: e.target.value })}
          />
        </div>
        <div className="flex flex-col w-2/4 mx-auto mt-10 gap-2">
          <label htmlFor="surName">Surname</label>
          <input
            type="text"
            value={input.surName}
            name="surName"
            placeholder="Surname"
            className="input w-full"
            onChange={(e) => setInput({ ...input, surName: e.target.value })}
          />
        </div>
        <div className="flex flex-col w-2/4 mx-auto mt-10 gap-2">
          <label htmlFor="otherName">Other Name</label>
          <input
            type="text"
            value={input.otherName}
            name="otherName"
            placeholder="Other Name"
            className="input w-full"
            onChange={(e) => setInput({ ...input, otherName: e.target.value })}
          />
        </div>
        <div className="flex flex-col w-2/4 mx-auto mt-10 gap-2">
          <label htmlFor="state">State</label>
          <input
            type="text"
            value={input.state}
            name="state"
            placeholder="State"
            className="input w-full"
            onChange={(e) => setInput({ ...input, state: e.target.value })}
          />
        </div>
        <div className="flex flex-col w-2/4 mx-auto mt-10 gap-2">
          <label htmlFor="localGovernment">Local Government</label>
          <input
            type="text"
            value={input.localGovt}
            name="localGovernment"
            placeholder="Local Government"
            className="input w-full"
            onChange={(e) => setInput({ ...input, localGovt: e.target.value })}
          />
        </div>
        <div className="flex flex-col w-2/4 mx-auto mt-10 gap-2">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="text"
            value={input.phoneNumber}
            name="phoneNumber"
            placeholder="Phone Number"
            className="input w-full"
            onChange={(e) =>
              setInput({ ...input, phoneNumber: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col w-2/4 mx-auto mt-10 gap-2">
          <input
            type="file"
            value={input.imgUrl}
            name="imgUrl"
            onChange={(e) => setInput({ ...input, imgUrl: e.target.value })}
          />
        </div>

        <div className="flex w-3/4 justify-center mx-auto mt-8">
          <button className="btn bg-yellow-700" onClick={handleUpdate}>
            Update
          </button>
        </div>
      </div>
    </>
  );
};

export default UpdateStudent;
