import { HiOutlineEmojiSad } from "react-icons/hi";

type ErrorProps = {
  errorMessage: string;
};

const ErrorMessage = ({ errorMessage }: ErrorProps) => {
  return (
    <div className="flex flex-col items-center text-red-400">
      <HiOutlineEmojiSad className="text-6xl" />
      <h2 className="text-xl">Error: {errorMessage}</h2>
    </div>
  );
};

export default ErrorMessage;
