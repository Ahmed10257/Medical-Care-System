import { Facebook } from 'lucide-react';

const FaceBookBtn = () => {

  const handleFacebookLogin = () => {
    window.location.href = 'http://localhost:3000/facebook';
  };

  return (
    <button
      className="mt-6 mb-7 flex bg-blue-500 w-56 m-auto rounded-md p-0.5 text-white items-center text-xs space-x-2"
      onClick={handleFacebookLogin}
    >
      <div className="flex text-start items-center">
        <Facebook
          size={22}
          color="#ffffff"
          fill="white"
          strokeWidth={0.5}
          className="me-1"
        />
        <div className="border-l-2 border-gray-400 h-7"></div>
      </div>
      <p className="text-end font-bold">Connect with Facebook</p>
    </button>
  );
};

export default FaceBookBtn;
