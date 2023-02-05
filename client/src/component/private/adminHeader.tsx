import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex bg-yellow-600 p-5">
        <div className="flex gap-3 justify-start">
          <button
            className="bg-yellow-400 p-3 text-yellow-800 rounded-md"
            onClick={() => navigate("/")}
          >
            Home
          </button>
        </div>
      </div>
    </>
  );
};
