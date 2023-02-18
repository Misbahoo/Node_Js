import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";
import { ExamHeader } from "./examHeader";
import SubmittedExam from "../submittedExam";
import MyCountdown from "../../public/MyCoundown";
const ExamSection = () => {
  const { state } = useLocation();
  const { user } = state;

  const englishSubmitted = JSON.parse(
    localStorage.getItem("englishSubmitted") as string
  );
  const mathsSubmitted = JSON.parse(
    localStorage.getItem("mathsSubmitted") as string
  );
  const chemistrySubmitted = JSON.parse(
    localStorage.getItem("chemistrySubmitted") as string
  );
  const physicsSubmitted = JSON.parse(
    localStorage.getItem("physicsSubmitted") as string
  );
  const biologySubmitted = JSON.parse(
    localStorage.getItem("biologySubmitted") as string
  );

  type ActiveType = {
    isActive: boolean;
  };

  const navLink = ({ isActive }: ActiveType) => {
    return {
      background: isActive ? "#555" : "",
      fontSize: isActive ? "16px" : "",
      outline: "none",
      boxShadow: isActive ? "5px 5px 5px #222" : "",
      left: isActive ? "20px" : "",
    };
  };

  return (
    <>
      <ExamHeader />
      <MyCountdown user={user} />
      <div className="">
        <div className="mx-auto mb-5">
          <p className="text-center text-green-500 uppercase text-4xl pb-5">
            College of Nursing Science, Tambuwal
          </p>
          <p className="text-center uppercase text-gray-700 text-3xl font-bold">
            Entrance Examination Exercise 2022/2023 Session{" "}
          </p>
        </div>
        <div className="flex flex-row w-2/4 mx-auto p-3 bg-gray-400 gap-2">
          <div className="flex flex-col w-2/4 gap-2 mx-auto bg-white p-3 rounded-md">
            {" "}
            <p>
              <span className="font-bold">Application No.: </span>
              {user.studentId}
            </p>
            <hr className="w-2/4 border-gray-500" />
            <p>
              <span className="font-bold">Phone No.: </span>
              {user.phoneNumber}
            </p>
          </div>
          <div className="flex flex-col w-2/4 gap-2 mx-auto bg-white p-3 rounded-md">
            {" "}
            <p>
              <span className="font-bold">First Name: </span>
              {user.firstName}
            </p>
            <hr className="w-2/4 border-gray-500" />
            <p>
              <span className="font-bold">Surname: </span>
              {user.surName}
            </p>
            {user.otherName && (
              <p>
                <span className="font-bold">Ohter Name: </span>
                {user.otherName}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-5 justify-center ml-8 -mt-16 fixed">
          {!englishSubmitted ? (
            <NavLink
              to="english"
              state={{ user: user }}
              className="bg-blue-500 text-white p-2 shadow-md shadow-gray-400 hover:shadow-gray-400 rounded-md relative hover:bg-gray-400"
              style={navLink}
            >
              English
            </NavLink>
          ) : (
            <div className="text-white p-2 rounded-md relative bg-gray-400">
              <button disabled>English</button>
            </div>
          )}

          {!mathsSubmitted ? (
            <NavLink
              to="maths"
              state={{ user: user }}
              className="bg-blue-500 text-white p-2 shadow-md shadow-gray-600 rounded-md relative hover:bg-gray-600"
              style={navLink}
            >
              Maths
            </NavLink>
          ) : (
            <div className="text-white p-2 rounded-md relative bg-gray-400">
              <button disabled>Maths</button>
            </div>
          )}

          {!chemistrySubmitted ? (
            <NavLink
              to="chemistry"
              state={{ user: user }}
              className="bg-blue-500 text-white p-2 shadow-md shadow-gray-600 rounded-md relative hover:bg-gray-600"
              style={navLink}
            >
              Chemistry
            </NavLink>
          ) : (
            <div className="text-white p-2 rounded-md relative bg-gray-400">
              <button disabled>Chemistry</button>
            </div>
          )}

          {!biologySubmitted ? (
            <NavLink
              to="biology"
              state={{ user: user }}
              className="bg-blue-500 text-white p-2 shadow-md shadow-gray-600 rounded-md relative hover:bg-gray-600"
              style={navLink}
            >
              Biology
            </NavLink>
          ) : (
            <div className="text-white p-2 rounded-md relative bg-gray-400">
              <button disabled>Biology</button>
            </div>
          )}

          {!physicsSubmitted ? (
            <NavLink
              to="physics"
              state={{ user: user }}
              className="bg-blue-500 text-white p-2 shadow-md shadow-gray-600 rounded-md relative hover:bg-gray-600"
              style={navLink}
            >
              Physics
            </NavLink>
          ) : (
            <div className="text-white p-2 rounded-md relative bg-gray-400">
              <button disabled>Physics</button>
            </div>
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default ExamSection;
