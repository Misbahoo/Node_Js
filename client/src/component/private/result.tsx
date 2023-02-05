import { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Axios from "axios";

const Result = () => {
  const navigate = useNavigate();

  const { state } = useLocation();

  useEffect(() => {
    if (state === null) {
      navigate("/admin");
    }
  }, []);

  console.log(state.user.data);
  //check if subjects are submitted
  const englishSubmitted = JSON.parse(
    localStorage.getItem("englishSubmitted") as string
  );
  const mathsSubmitted = JSON.parse(
    localStorage.getItem("mathsSubmitted") as string
  );
  const physicsSubmitted = JSON.parse(
    localStorage.getItem("physicsSubmitted") as string
  );
  const chemistrySubmitted = JSON.parse(
    localStorage.getItem("chemistrySubmitted") as string
  );
  const biologySubmitted = JSON.parse(
    localStorage.getItem("biologySubmitted") as string
  );

  //variables for setting the result
  const [englishResult, setEnglishResult] = useState<
    { [key: string]: string }[]
  >([]);
  const [mathsResult, setMathsResult] = useState<{ [key: string]: string }[]>(
    []
  );
  const [chemistryResult, setChemistryResult] = useState<
    { [key: string]: string }[]
  >([]);
  const [physicsResult, setPhysicsResult] = useState<
    { [key: string]: string }[]
  >([]);
  const [biologyResult, setBiologyResult] = useState<
    { [key: string]: string }[]
  >([]);

  //grap the studentId
  const [student, setStudent] = useState<{ [key: string]: string }[]>([]);
  const studentId = JSON.parse(localStorage.getItem("studentId") as string);

  //get Questions and Answers
  useEffect(() => {
    if (englishSubmitted) {
      setEnglishResult(
        JSON.parse(localStorage.getItem("englishAnswers") as string)
      );
    }
    if (mathsSubmitted) {
      setMathsResult(
        JSON.parse(localStorage.getItem("mathsAnswers") as string)
      );
    }
    if (chemistrySubmitted) {
      setChemistryResult(
        JSON.parse(localStorage.getItem("chemistryAnswers") as string)
      );
    }
    if (physicsSubmitted) {
      setPhysicsResult(
        JSON.parse(localStorage.getItem("physicsAnswers") as string)
      );
    }
    if (biologySubmitted) {
      setBiologyResult(
        JSON.parse(localStorage.getItem("biologyAnswers") as string)
      );
    }
  }, []);

  //get user information from the database
  useEffect(() => {
    const getStudent = async () => {
      const { data } = await Axios.get(
        `http://localhost:3500/students/${studentId}`
      );
      setStudent(data);
    };
    getStudent();
  }, [studentId]);

  function totalValues() {
    const englishValue = englishResult.reduce((acc, current) => {
      acc += parseInt(current.marks);
      return acc;
    }, 0);

    const mathsValue = mathsResult.reduce((acc, current) => {
      acc += parseInt(current.marks);
      return acc;
    }, 0);

    const chemistryValue = chemistryResult.reduce((acc, current) => {
      acc += parseInt(current.marks);
      return acc;
    }, 0);

    const physicsValue = physicsResult.reduce((acc, current) => {
      acc += parseInt(current.marks);
      return acc;
    }, 0);

    const biologyValue = biologyResult.reduce((acc, current) => {
      acc += parseInt(current.marks);
      return acc;
    }, 0);

    return {
      englishValue,
      mathsValue,
      chemistryValue,
      physicsValue,
      biologyValue,
    };
  }

  const totalMarks = totalValues();

  const [scoresUploaded, setScoresUploaded] = useState(false);
  //Add the scores to database
  const handlePopulateDB = async () => {
    setScoresUploaded(true);
    const results = {
      englishMarks: totalMarks.englishValue ? totalMarks.englishValue : 0,
      mathsMarks: totalMarks.mathsValue ? totalMarks.mathsValue : 0,
      chemistryMarks: totalMarks.chemistryValue ? totalMarks.chemistryValue : 0,
      physicsMarks: totalMarks.physicsValue ? totalMarks.physicsValue : 0,
      biologyMarks: totalMarks.biologyValue ? totalMarks.biologyValue : 0,
    };
    try {
      await Axios.put(`http://localhost:3500/results/${studentId}`, results);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClear = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <>
      <div>
        {student.map((items, index) => {
          return (
            <>
              <div
                key={index}
                className="flex flex-col gap-3 mt-5 bg-yellow-200 w-2/4 mx-auto p-3 shadow-md shadow-gray-500"
              >
                <div className="flex gap-3">
                  <span className="font-bold text-yellow-700">
                    Application No.:{" "}
                  </span>
                  <p>{items.studentId}</p> |
                  <span className="font-bold text-yellow-700">
                    Phone Number:{" "}
                  </span>
                  <p>{items.phoneNumber}</p>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-yellow-700">
                    First Name:{" "}
                  </span>
                  <p>{items.firstName}</p> |
                  <span className="font-bold text-yellow-700">Surname: </span>
                  <p>{items.surName}</p> |
                  <span className="font-bold text-yellow-700">
                    Other Name:{" "}
                  </span>
                  {items.otherName && <p>{items.otherName}</p>}
                </div>
              </div>
            </>
          );
        })}
      </div>
      <div className="w-3/4 mx-auto p-3 mt-10 rounded-md shadow shadow-gray-500">
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th>Q No.</th>
              <th>Question</th>
              <th>Answer</th>
              <th>Status</th>
              <th>Marks</th>
            </tr>
          </thead>
          <tbody>
            {englishResult.map((item, index) => {
              return (
                <tr key={index} className="border border-gray-400">
                  <td className="border border-gray-400">
                    {item.questionNumber}
                  </td>
                  <td className="border border-gray-400">{item.question}</td>
                  <td className="border border-gray-400">{item.answer}</td>
                  <td
                    className={
                      item.status === "correct"
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }
                  >
                    {item.status}
                  </td>
                  <td className="border border-gray-400">{item.marks}</td>
                </tr>
              );
            })}
            <tr>
              <td colSpan={4}>TOTAL MARKS</td>
              <td>{totalMarks.englishValue}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="w-3/4 mx-auto p-3 mt-10 rounded-md shadow shadow-gray-500">
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th>Q No.</th>
              <th>Question</th>
              <th>Answer</th>
              <th>Status</th>
              <th>Marks</th>
            </tr>
          </thead>
          <tbody>
            {mathsResult.map((item, index) => {
              return (
                <tr key={index} className="border border-gray-400">
                  <td className="border border-gray-400">
                    {item.questionNumber}
                  </td>
                  <td className="border border-gray-400">{item.question}</td>
                  <td className="border border-gray-400">{item.answer}</td>
                  <td
                    className={
                      item.status === "correct"
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }
                  >
                    {item.status}
                  </td>
                  <td className="border border-gray-400">{item.marks}</td>
                </tr>
              );
            })}
            <tr>
              <td colSpan={4}>TOTAL MARKS</td>
              <td>{totalMarks.mathsValue}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="w-3/4 mx-auto p-3 mt-10 rounded-md shadow shadow-gray-500">
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th>Q No.</th>
              <th>Question</th>
              <th>Answer</th>
              <th>Status</th>
              <th>Marks</th>
            </tr>
          </thead>
          <tbody>
            {chemistryResult.map((item, index) => {
              return (
                <tr key={index} className="border border-gray-400">
                  <td className="border border-gray-400">
                    {item.questionNumber}
                  </td>
                  <td className="border border-gray-400">{item.question}</td>
                  <td className="border border-gray-400">{item.answer}</td>
                  <td
                    className={
                      item.status === "correct"
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }
                  >
                    {item.status}
                  </td>
                  <td className="border border-gray-400">{item.marks}</td>
                </tr>
              );
            })}
            <tr>
              <td colSpan={4}>TOTAL MARKS</td>
              <td>{totalMarks.chemistryValue}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="w-3/4 mx-auto p-3 mt-10 rounded-md shadow shadow-gray-500">
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th>Q No.</th>
              <th>Question</th>
              <th>Answer</th>
              <th>Status</th>
              <th>Marks</th>
            </tr>
          </thead>
          <tbody>
            {physicsResult.map((item, index) => {
              return (
                <tr key={index} className="border border-gray-400">
                  <td className="border border-gray-400">
                    {item.questionNumber}
                  </td>
                  <td className="border border-gray-400">{item.question}</td>
                  <td className="border border-gray-400">{item.answer}</td>
                  <td
                    className={
                      item.status === "correct"
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }
                  >
                    {item.status}
                  </td>
                  <td className="border border-gray-400">{item.marks}</td>
                </tr>
              );
            })}
            <tr>
              <td colSpan={4}>TOTAL MARKS</td>
              <td>{totalMarks.physicsValue}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="w-3/4 mx-auto p-3 mt-10 rounded-md shadow shadow-gray-500">
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th>Q No.</th>
              <th>Question</th>
              <th>Answer</th>
              <th>Status</th>
              <th>Marks</th>
            </tr>
          </thead>
          <tbody>
            {biologyResult.map((item, index) => {
              return (
                <tr key={index} className="border border-gray-400">
                  <td className="border border-gray-400">
                    {item.questionNumber}
                  </td>
                  <td className="border border-gray-400">{item.question}</td>
                  <td className="border border-gray-400">{item.answer}</td>
                  <td
                    className={
                      item.status === "correct"
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }
                  >
                    {item.status}
                  </td>
                  <td className="border border-gray-400">{item.marks}</td>
                </tr>
              );
            })}
            <tr>
              <td colSpan={4}>TOTAL MARKS</td>
              <td>{totalMarks.biologyValue}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mx-auto w-2/4 gap-3 my-10">
        <button
          onClick={handlePopulateDB}
          className="bg-yellow-500 p-3 text-yellow-800 rounded-md"
        >
          Populate DB
        </button>
        <button
          onClick={handleClear}
          className={
            scoresUploaded
              ? "bg-red-500 p-3 text-white rounded-md"
              : "bg-gray-400 p-3 text-gray-600 rounded-md"
          }
          disabled={scoresUploaded ? false : true}
        >
          Clear Storage
        </button>
      </div>
    </>
  );
};

export default Result;
