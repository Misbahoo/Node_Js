import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex justify-center items-center gap-8 w-3/4 mx-auto mt-20">
        <div className="w-2/4 mx-auto flex flex-col flex-1 bg-yellow-200 items-center justify-center p-8 shadow-md shadow-gray-400">
          <div className="p-3 mb-5">
            <p>Examination section for CBT examination exercise</p>
          </div>
          <button
            className="p-5 bg-yellow-500 rounded-md text-yellow-800"
            onClick={() => navigate("login")}
          >
            Exam Section
          </button>
        </div>
        <div className="w-2/4 mx-auto flex flex-col flex-1 bg-yellow-200 items-center justify-center p-8 shadow-md shadow-gray-400">
          <div className="p-3 mb-5">
            <p>
              Admin section for checking results, adding students, and printing
              the result.
            </p>
          </div>
          <button
            className="p-5 bg-yellow-500 rounded-md text-yellow-800"
            onClick={() => navigate("admin")}
          >
            Admin Section
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
