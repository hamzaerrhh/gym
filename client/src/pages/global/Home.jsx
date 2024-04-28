import Class from "../../components/Class";
import HerBaner from "../../components/HerBaner";
import Navbar from "../../components/NavBar";
import Welcome from "../../components/Welcome";
const Home = () => {
  return (
    <div>
      <Navbar />
      <HerBaner />
      <Welcome />
      <Class />
    </div>
  );
};
export default Home;
