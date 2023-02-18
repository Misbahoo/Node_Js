import { useNavigate } from "react-router-dom";

const TimeUp = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="w-2/4 mx-auto mb-8 mt-20">
        <button
          className="p-3 rounded-md shadow-sm shadow-gray-600 hover:bg-gray-500 hover:text-white"
          onClick={() => navigate("/", { replace: true })}
        >
          Home
        </button>
      </div>
      <div className="w-2/4 mx-auto bg-gray-100 shadow-md shadow-gray-500 mt-10 p-10 rounded-md">
        <p className="text-center text-4xl text-gray-500">You time is up.</p>
      </div>
    </>
  );
};

export default TimeUp;
