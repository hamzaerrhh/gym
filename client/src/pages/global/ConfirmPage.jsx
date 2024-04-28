import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const ConfirmPage = () => {
  const { activation } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const handleVerification = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/auth/verify/${activation}`
        );
        console.log(res);

        navigate("/login");
      } catch (err) {
        console.log(err);
      }
    };

    handleVerification(); // Call the verification function inside useEffect
  }, [activation]); // Add activation as a dependency to useEffect

  console.log(activation);

  return (
    <div className="w-full h-full absolute">
      <h1 className="flex justify-center items-center w-full h-full text-3xl">
        Start your journey
      </h1>
    </div>
  );
};

export default ConfirmPage;
