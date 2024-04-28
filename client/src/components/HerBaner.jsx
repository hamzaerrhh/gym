import gymBanner from "../assets/gymBanner.jpg";
import gym from "../assets/gym.svg";
const HerBaner = () => {
  return (
    <section id="banner">
      <div
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        }}
        className=" w-full h-screen  flex justify-center items-center"
      >
        <div className=" flex flex-col items-center">
          <img src={gym} width={80} />
          <br />
          <h1 className=" font-extrabold text-5xl text-white">
            {" "}
            gym gladiator
          </h1>
        </div>
      </div>
    </section>
  );
};
export default HerBaner;
