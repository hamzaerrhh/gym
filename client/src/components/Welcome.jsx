import msg from "../assets/message.jpg";
const Welcome = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${msg})`,
      }}
      className=" bg-cover w-full h-screen flex items-center justify-center"
    >
      <div className=" px-24">
        <p className=" text-center md:text-3xl text-lg text-white font-bold  ">
          Découvrez les plus luxueux clubs de sport et de remise en forme du
          Maroc avec Passage Fitness. Prisé par des célébrités et athlètes de
          renommée mondiale, chacun de nos cinq clubs dispose de machines
          High-Tech de dernière génération, d’un coaching d’exception,
          d’activités à la pointe du fitness, ainsi que des meilleurs guides de
          nutrition sportive et diététique. Dans ces lieux ultramodernes et au
          gré de vos préférences, libérez les potentiels qui sont en vous avec
          Passage Fitness.
        </p>
        <p className=" pt-12 text-center text-white underline">
          {" "}
          try your first day{" "}
        </p>
      </div>
    </div>
  );
};
export default Welcome;
