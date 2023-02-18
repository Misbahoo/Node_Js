import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import { englishQuestions } from "../questions/englishQ";

const English = () => {
  const theRef = useRef();
  const { state } = useLocation();

  const { user } = state;

  const [input, setInputs] = useState<{ [key: string]: string }[]>([]);
  const [answersSelected, setAnswersSelected] = useState({});
  const [selected, setSelected] = useState<{ [key: string]: boolean }>({});
  const [submitted, setSubmitted] = useState(false);
  const [keyCode, setKeyCode] = useState("");

  var index1 = 0;

  const answers = englishQuestions.map((items, index) => items.answer);

  const handleChange = (e: any) => {
    const numbers = /\d+/g;

    switch (e.code) {
      case "keyA":
        setKeyCode("keyA");
        const { value, name } = e.target;
        const currentQuestionNumber = name.slice(name.indexOf("englishQ"), 10);
        const currentQuestion = name.slice(name.indexOf(":") + 2);
        const currentArrayIndex = name.match(numbers)[0] - 1;
        if (answers[currentArrayIndex] === value) {
          setInputs([
            ...input,
            {
              questionNumber: currentQuestionNumber.trim(),
              question: currentQuestion,
              answer: value,
              status: "correct",
              marks: "2",
            },
          ]);
          setAnswersSelected({ ...answersSelected, [name]: value });
        } else {
          setInputs([
            ...input,
            {
              questionNumber: currentQuestionNumber.trim(),
              question: currentQuestion,
              answer: value,
              status: "wrong",
              marks: "0",
            },
          ]);
          setAnswersSelected({ ...answersSelected, [name]: value });
        }

        //detect if an answer was selected
        setSelected({ ...selected, [currentArrayIndex + 1]: true });

        //convert the answered object keys into an array
        const submittedKeys = Object.keys(selected);

        //check if all answers were selected
        const checkSelelction = submittedKeys.filter(
          (key, index) => selected[key] === true
        );

        if (checkSelelction.length + 1 >= 10) {
          setAllSelected(true);
        } else {
          setAllSelected(false);
        }
        break;
      case "keyB":
        setKeyCode("keyB");
        break;
      case "keyC":
        setKeyCode("keyC");
        break;
      case "keyD":
        setKeyCode("keyD");
        break;
      default:
        setKeyCode("");
    }

    setSelectedValue([...selectedValue, { theSelectedValue: e.target.value }]);
    localStorage.setItem("theSelectedValue", JSON.stringify(selectedValue));
    console.log(localStorage.getItem("theSelectedValue") as string);

    const { value, name } = e.target;
    const currentQuestionNumber = name.slice(name.indexOf("englishQ"), 10);
    const currentQuestion = name.slice(name.indexOf(":") + 2);
    const currentArrayIndex = name.match(numbers)[0] - 1;
    if (answers[currentArrayIndex] === value) {
      setInputs([
        ...input,
        {
          questionNumber: currentQuestionNumber.trim(),
          question: currentQuestion,
          answer: value,
          status: "correct",
          marks: "2",
        },
      ]);
      setAnswersSelected({ ...answersSelected, [name]: value });
    } else {
      setInputs([
        ...input,
        {
          questionNumber: currentQuestionNumber.trim(),
          question: currentQuestion,
          answer: value,
          status: "wrong",
          marks: "0",
        },
      ]);
      setAnswersSelected({ ...answersSelected, [name]: value });
    }

    //detect if an answer was selected
    setSelected({ ...selected, [currentArrayIndex + 1]: true });

    //convert the answered object keys into an array
    const submittedKeys = Object.keys(selected);

    //check if all answers were selected
    const checkSelelction = submittedKeys.filter(
      (key, index) => selected[key] === true
    );

    if (checkSelelction.length + 1 >= 10) {
      setAllSelected(true);
    } else {
      setAllSelected(false);
    }
  };

  const submit = (e: any) => {
    e.preventDefault();
    setSubmitted(true);
    localStorage.setItem("studentId", JSON.stringify(user.studentId));
    localStorage.setItem("englishSubmitted", "true");
    localStorage.setItem("englishAnswers", JSON.stringify(input));
  };

  useEffect(() => {
    document.body.addEventListener("keydown", handleChange);
  }, [input]);

  return (
    <>
      <div className="bg-gray-200 mx-auto my-10 w-3/4 p-10 shadow-sm shadow-gray-600 rounded-lg">
        <form onSubmit={submit} className="mb-10">
          {englishQuestions.map((question) => {
            index1 = index1 + 1;
            return (
              <div
                key={index1}
                className={index1 === theValue.first ? "" : "hidden"}
              >
                <h3>
                  <span className={submitted ? "text-gray-400" : "font-bold"}>
                    Q {index1}:
                  </span>{" "}
                  {question.start}{" "}
                  <span className="underline">{question.theWord}</span>{" "}
                  {question.end}
                </h3>
                {question.options.map((item, index) => {
                  return (
                    <div className="mb-3" key={index}>
                      <label htmlFor="">a: </label>
                      <input
                        id="a"
                        type="radio"
                        name={`englishQ${index1} : ${question.start} ${question.theWord} ${question.end}`}
                        value={item.a}
                        onChange={handleChange}
                        disabled={submitted ? true : false}
                        checked={keyCode === "KeyA" ? true : false}
                      />
                      <label htmlFor=""> {item.a}</label>
                      <br />

                      <label htmlFor="">b: </label>
                      <input
                        id="b"
                        type="radio"
                        name={`englishQ${index1} : ${question.start} ${question.theWord} ${question.end}`}
                        value={item.b}
                        onChange={handleChange}
                        disabled={submitted ? true : false}
                        checked={keyCode === "KeyB" ? true : false}
                      />
                      <label htmlFor=""> {item.b}</label>
                      <br />

                      <label htmlFor="">c: </label>
                      <input
                        id="c"
                        type="radio"
                        name={`englishQ${index1} : ${question.start} ${question.theWord} ${question.end}`}
                        value={item.c}
                        onChange={handleChange}
                        disabled={submitted ? true : false}
                        checked={keyCode === "KeyC" ? true : false}
                      />
                      <label htmlFor=""> {item.c}</label>
                      <br />

                      <label htmlFor="">d: </label>
                      <input
                        id="d"
                        type="radio"
                        name={`englishQ${index1} : ${question.start} ${question.theWord} ${question.end}`}
                        value={item.d}
                        onChange={handleChange}
                        disabled={submitted ? true : false}
                        checked={keyCode === "KeyD" ? true : false}
                      />
                      <label htmlFor=""> {item.d}</label>
                    </div>
                  );
                })}
              </div>
            );
          })}
          <div className="flex justify-center">
            <button
              type="submit"
              name="submit"
              className="btnExam p-3 mx-auto cursor-pointer"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default English;
