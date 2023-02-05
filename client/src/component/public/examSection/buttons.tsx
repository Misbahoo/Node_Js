const Buttons = (props: any) => {
  const { disableNext, disablePrev } = props.states;
  const { prevButton, nextButton } = props.prev_next_buttons;
  const handleKeyPress = props.handleKeyPress;

  return (
    <div className="flex flex-row">
      {disablePrev ? (
        <div className="flex flex-1 justify-start mb-10">
          <button
            type="button"
            className="w-2/4 p-3 rounded-sm bg-gray-300 text-gray-400"
            disabled
          >
            Previous
          </button>
        </div>
      ) : (
        <div className="flex flex-1 justify-start mb-10">
          <button
            type="button"
            className="btnExam w-2/4 p-3"
            onClick={prevButton}
          >
            Previous
          </button>
        </div>
      )}

      {disableNext ? (
        <div className="flex flex-1 justify-end mb-10">
          <button
            type="button"
            className="w-2/4 p-3 rounded-sm bg-gray-300 text-gray-400"
            disabled
          >
            Next
          </button>
        </div>
      ) : (
        <div className="flex flex-1 justify-end mb-10">
          <button
            type="button"
            className="btnExam w-2/4 p-3"
            onClick={nextButton}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Buttons;
