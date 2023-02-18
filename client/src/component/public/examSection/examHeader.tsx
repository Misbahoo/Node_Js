import { useNavigate } from "react-router-dom";
import Countdown from "react-countdown";

export const ExamHeader = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex bg-green-600 p-5 mb-10">
        <div className="flex gap-3 justify-end w-full">
          <button
            className="bg-green-400 p-3 text-green-800 rounded-md"
            onClick={() => navigate("/", { replace: true })}
          >
            Home
          </button>
        </div>
      </div>
    </>
  );
};
