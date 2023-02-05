import Axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SearchUsers = () => {
  const navigate = useNavigate();

  const [input, setInput] = useState("");
  const [errorMessage, setErrorMessage] = useState<{ [key: string]: string }>(
    {}
  );
  const [studentResult, setStudentResult] = useState<
    { [key: string]: string }[]
  >([]);
  const [displayTable, setDisplayTable] = useState(false);
  const [onFocus, setOnFocus] = useState(false);

  const searchAllStudents = async () => {
    if (input.length === 0) {
      try {
        const { data } = await Axios.get("http://localhost:3500/students");
        setErrorMessage({ message: "" });
        setStudentResult(data);
        setDisplayTable(true);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const { data } = await Axios.get(
          `http://localhost:3500/students/${input}`
        );
        if (data.length === 0) {
          setErrorMessage({ message: "No record found" });
        } else {
          setErrorMessage({ message: "" });
        }
        setStudentResult(data);
        setDisplayTable(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div className="flex flex-col w-3/4 mx-auto my-20">
        <div>
          <input
            className="input w-full"
            type="text"
            name="search"
            value={input}
            placeholder="Search a Student"
            onFocus={() => setOnFocus(true)}
            onBlur={() => setOnFocus(false)}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <p>{errorMessage.message}</p>
        <div className="flex justify-center mt-5 mb-5">
          <button
            type="button"
            className="btn shadow shadow-gray-500"
            onClick={searchAllStudents}
          >
            {!onFocus ? <span>Get All Students</span> : <span>Search</span>}
          </button>
        </div>

        {displayTable && (
          <div className="">
            <table className="table-auto border border-collapse mx-auto w-full">
              <thead>
                <tr className="border border-gray-400">
                  <th className="p-3">SN</th>
                  <th>APPlication No.</th>
                  <th>First Name</th>
                  <th>Surname</th>
                  <th>Other Name</th>
                  <th>State</th>
                  <th>Local Govt.</th>
                  <th>Phone Number</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {studentResult
                  .filter((item) => {
                    if (input === "") {
                      return item;
                    } else if (
                      item.firstName
                        .toLowerCase()
                        .includes(input.toLowerCase()) ||
                      item.surName
                        .toLowerCase()
                        .includes(input.toLowerCase()) ||
                      item.otherName
                        .toLowerCase()
                        .includes(input.toLowerCase()) ||
                      item.state.toLowerCase().includes(input.toLowerCase()) ||
                      item.localGovt
                        .toLowerCase()
                        .includes(input.toLowerCase()) ||
                      item.phoneNumber
                        .toLowerCase()
                        .includes(input.toLowerCase()) ||
                      item.studentId.toLowerCase().includes(input.toLowerCase())
                    ) {
                      return item;
                    }
                  })
                  .map((items, index) => {
                    return (
                      <tr key={index} className="p-5 border border-gray-400">
                        <td>{items.id}</td>
                        <td>{items.studentId}</td>
                        <td>{items.firstName}</td>
                        <td>{items.surName}</td>
                        <td>{items.otherName}</td>
                        <td>{items.state}</td>
                        <td>{items.localGovt}</td>
                        <td>{items.phoneNumber}</td>
                        <td className="bg-green-500 text-white w-[2rem]">
                          <button
                            className="w-[2rem]"
                            onClick={() =>
                              navigate(`/dashBoard/updateStudent/${items.id}`, {
                                state: { student: items },
                              })
                            }
                          >
                            Edit
                          </button>
                        </td>
                        <td className="bg-red-500 text-white w-[2rem]">
                          <button
                            onClick={() =>
                              navigate(`/dashBoard/deleteStudent/${items.id}`, {
                                state: { student: items },
                              })
                            }
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={10} className="text-center p-2">
                    College of Nursing Science Tambuwal, Sokoto State
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>
    </>
  );
};
export default SearchUsers;
