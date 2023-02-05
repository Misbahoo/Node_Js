const QuestionJumper = (props: any) => {
  const { setDisablePrev, setDisableNext, setTheValue } = props.states;
  const { theValue, selected } = props;
  return (
    <div className="flex justify-center">
      {[...Array(10)].map((item, index) => {
        return (
          <button
            key={index}
            className={
              index + 1 === theValue.first
                ? "w-10 h-10 p-2 m-0.5 rounded-full bg-white border border-black"
                : selected[index + 1] === true
                ? "w-10 h-10 p-2 m-0.5 rounded-full bg-green-500 text-white"
                : "w-10 p-2 m-0.5 rounded-full bg-red-300 hover:bg-green-400 hover:text-white"
            }
            onClick={() => {
              if (index + 1 === 1) {
                setDisablePrev(true);
              } else setDisablePrev(false);
              if (index + 1 === 10) {
                setDisableNext(true);
              } else {
                setDisableNext(false);
              }
              setTheValue({ ...theValue, first: index + 1 });
            }}
          >
            {index + 1}
          </button>
        );
      })}
    </div>
  );
};

export default QuestionJumper;
