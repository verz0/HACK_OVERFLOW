import "../../Global.css";
import Insights from "./insights";
import Navbar from "./Navbar";
import Chart from './chart'
import "./Home.css";

const insightHome = () => {
  return (
  <>
    <div className=" Home">
      <Navbar />
      <Insights />
      <Chart />
    </div>
    </>
  );
};
export default insightHome;
