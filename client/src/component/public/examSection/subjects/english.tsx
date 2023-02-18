import { useState, useEffect, useRef, InputHTMLAttributes } from "react";
import { useLocation } from "react-router-dom";

import { englishQuestions } from "../questions/englishQ";
import Buttons from "../buttons";
import QuestionJumper from "./questionJumper";
import SubmittedExam from "../../submittedExam";

const English = () => {
  const theRef = useRef();
  const { state } = useLocation();

  const { user } = state;

  const [subject, setSubject] = useState("English");
  const [selectedValue, setSelectedValue] = useState<
    { [key: string]: string }[]
  >([]);
  const [input, setInputs] = useState<{ [key: string]: string }[]>([]);
  const [answersSelected, setAnswersSelected] = useState({});
  const [selected, setSelected] = useState<{ [key: string]: boolean }>({});
  const [allSelected, setAllSelected] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [keyCode, setKeyCode] = useState("");
  const [onKeyDownValue, setOnKeyDownValue] = useState("");
  var index1 = 0;

  const answers = englishQuestions.map((items, index) => items.answer);

  const handleKeydown = (e: any) => {
    e.preventDefault();

    if (
      e.code === "KeyA" ||
      e.code === "KeyB" ||
      e.code === "KeyC" ||
      e.code === "KeyD"
    ) {
      console.log(e.code);
      setKeyCode(e.code);

      const { name, value, type } = e.target;
      setOnKeyDownValue(value);
      console.log(
        "I am the value " + value + " type " + type + " and name " + name
      );
    }
  };

  useEffect(() => {
    document.body.addEventListener("keydown", handleKeydown);
    return () => {
      document.body.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  function handleChange(event: any) {
    const numbers = /\d+/g;

    console.log(event.target.value);
    setSelectedValue([
      ...selectedValue,
      { theSelectedValue: event.target.value },
    ]);
    localStorage.setItem("theSelectedValue", JSON.stringify(selectedValue));
    console.log(localStorage.getItem("theSelectedValue") as string);

    const { value, name } = event.target;
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
  }

  const submit = (e: any) => {
    e.preventDefault();
    setSubmitted(true);

    localStorage.setItem("studentId", JSON.stringify(user.studentId));
    localStorage.setItem("englishSubmitted", "true");
    localStorage.setItem("englishAnswers", JSON.stringify(input));
  };

  const [theValue, setTheValue] = useState({ first: 1 });
  const [disableNext, setDisableNext] = useState(false);
  const [disablePrev, setDisablePrev] = useState(true);

  //use next and back keyboard arrows to move through questions
  const KeyDownEventListener = (e: KeyboardEvent) => {
    if (e.code == "ArrowRight") nextButton(e);
    if (e.code == "ArrowLeft") prevButton(e);
  };

  useEffect(() => {
    document.body.addEventListener("keydown", KeyDownEventListener);
    return () => {
      document.body.removeEventListener("keydown", KeyDownEventListener);
    };
  }, [theValue.first]);

  //next button functionality
  function nextButton(e: any) {
    e.preventDefault();
    setDisablePrev(false);

    //stops increamenting first and second values when the number exceeds the questions
    if (!(theValue.first === 10)) {
      setTheValue({ ...theValue, first: theValue.first + 1 });
      // document.documentElement.scrollTop = 0;
    }

    //set values for enabling submit and disenabling next buttons
    if (theValue.first >= 9) {
      setDisableNext(true);
    } else {
      setDisableNext(false);
    }

    //enable previous button
    if (theValue.first >= 1) {
      setDisablePrev(false);
    }
  }

  //previous button functionality
  function prevButton(e: any) {
    e.preventDefault();

    //set values for disenabling submit and enabling next buttons
    setDisableNext(false);

    //stops decreament when first and second values are less than or equals 0
    if (!(theValue.first <= 1)) {
      setTheValue({ ...theValue, first: theValue.first - 1 });
    }

    //disabling the previous button
    if (theValue.first <= 2) {
      setDisablePrev(true);
    }

    //enabling next buttons
    if (theValue.first <= 10) {
      setDisableNext(false);
    }
  }

  useEffect(() => {
    document.getElementById("a0")?.focus();
    console.log(theRef.current);
    console.log(document.getElementById("a0"));
  }, []);

  return (
    <>
      {submitted ? (
        <SubmittedExam subject={subject} />
      ) : (
        <div className="bg-gray-200 mx-auto my-10 w-3/4 p-10 shadow-sm shadow-gray-600 rounded-lg">
          <div className="mb-5 p-3 bg-gray-700 rounded-lg">
            <p className="uppercase font-bold mb-3 text-white">
              Examination: Use of English
            </p>
            <p className="italic text-white mb-3">
              Please read the questions carefully and select the correct answer
              before you move to the next question
            </p>
            <span className="uppercase font-bold text-white">Note:</span>{" "}
            <span className="italic text-white">
              You can only select one answer for each question
            </span>
          </div>
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
                          ref={theRef}
                          id={`a${index}`}
                          checked={keyCode === "KeyA" ? true : false}
                          type="radio"
                          name={`englishQ${index1} : ${question.start} ${question.theWord} ${question.end}`}
                          value={item.a}
                          onChange={handleChange}
                          disabled={submitted ? true : false}
                        />
                        <label htmlFor=""> {item.a}</label>
                        <br />

                        <label htmlFor="">b: </label>
                        <input
                          id={`b${index}`}
                          type="radio"
                          name={`englishQ${index1} : ${question.start} ${question.theWord} ${question.end}`}
                          value={item.b}
                          onChange={keyCode ? handleKeydown : handleChange}
                          disabled={submitted ? true : false}
                          checked={keyCode === "KeyB" ? true : false}
                        />
                        <label htmlFor=""> {item.b}</label>
                        <br />

                        <label htmlFor="">c: </label>
                        <input
                          id={`c${index}`}
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
                          id={`d${index}`}
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

            {allSelected ? (
              <div className="flex justify-center">
                <button
                  type="submit"
                  name="submit"
                  className="btnExam p-3 mx-auto cursor-pointer"
                >
                  Submit
                </button>
              </div>
            ) : (
              ""
            )}
          </form>

          <Buttons
            states={{ disableNext, disablePrev }}
            prev_next_buttons={{ prevButton, nextButton }}
          />
          <QuestionJumper
            states={{ setDisableNext, setDisablePrev, setTheValue }}
            theValue={theValue}
            selected={selected}
          />

          <div>
            <p className="text-gray-600 text-center italic mt-8">
              You cannot change your answer after you have submitted your form.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default English;
