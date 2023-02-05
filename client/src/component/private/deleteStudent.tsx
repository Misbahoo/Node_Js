import { useNavigate, useLocation } from "react-router-dom";
import Axios from "axios";

const DeleteStudent = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { student } = state;

  const deleteTheStudent = async () => {
    try {
      const data = await Axios.delete(
        `http://localhost:3500/students/${student.id}`
      );
      navigate("/", { replace: true });

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="mx-auto w-3/4 mt-20 mb-8">
        <div className="mb-8">
          <p className="text-xl text-center">
            The action you are about to make is inreversible
          </p>
        </div>
        <table className="table-auto mx-auto">
          <thead>
            <tr>
              <th>App Number</th>
              <th>First Name</th>
              <th>Surname</th>
              <th>Other Name</th>
              <th>State</th>
              <th>Local Govt.</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{student.studentId}</td>
              <td>{student.firstName}</td>
              <td>{student.surName}</td>
              <td>{student.otherName}</td>
              <td>{student.state}</td>
              <td>{student.localGovt}</td>
              <td>{student.phoneNumber}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex w-2/4 mx-auto justify-center">
        <button className="btn" onClick={deleteTheStudent}>
          Delete
        </button>
      </div>
    </>
  );
};

export default DeleteStudent;
