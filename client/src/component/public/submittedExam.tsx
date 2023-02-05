const SubmittedExam = (props: any) => {
  const { subject } = props;
  return (
    <>
      <div className="bg-gray-200 mx-auto my-10 w-3/4 p-10 shadow-sm shadow-gray-600 rounded-lg">
        <p className="text-center">
          You have submitted your {subject} exam. You can move to any available
          exam by the left of the screen.
        </p>
      </div>
    </>
  );
};

export default SubmittedExam;
