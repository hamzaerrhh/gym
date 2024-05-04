import CoachDetail from "../../components/CoachDetail";
import Cotch from "../../components/Cotch";
import Coachheader from "../user/hero/Coachheader";
import {
  box,
  mma,
  piscine,
  taekwando,
  gym_dark,
  gym_photo,
  girl_train,
  massage,
} from "../../assets";
//in here the client should login to see the cotch and booking
//and get the data from admin  panel to add cotch

const PersonaleTraining = () => {
  const coachs = [
    {
      id: 1,
      name: "Maryam",
      imageMain: box,
      type: "coach basket",

      description: "description of mariam coach basketvall",
      images: [piscine, mma, taekwando],
    },
    {
      id: 2,
      name: "Sara",
      imageMain: girl_train,
      type: "girl train",
      description:
        "Trained in London. She is a professional fitness model and trainer with over 5 years experience in the industry.",
      images: [gym_dark, gym_photo, massage],
    },
  ];
  return (
    <div className=" bg-black w-full h-full">
      <Coachheader />
      {coachs &&
        coachs.map((coach, index) => (
          <CoachDetail key={index} detaille={coach} />
        ))}
    </div>
  );
};
export default PersonaleTraining;
