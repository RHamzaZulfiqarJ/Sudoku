import { PacmanLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="flex h-screen justify-center items-center">
      <PacmanLoader color="white" size={50} />
    </div>
  );
};

export default Loading;
