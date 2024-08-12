import Joyride from "react-joyride";
import useBanner from "../hooks/useBanner";
import About from "./About";
import Banner from "./Banner";
import Footer from "./Footer";
import Pricing from "./Pricing";
import { JOYRIDE_STEPS_FOR_GUEST } from "../constants";

const Home = () => {
  const { timer, active, banner, closeBanner } = useBanner();
  const showJoyride = !localStorage.getItem("home-tour-done");

  const joyrideCB = (event: any) => {
    if (event.action === "reset") {
      localStorage.setItem("home-tour-done", "true");
    }
  };

  return (
    <div>
      <div className="text-center flex items-center justify-center text-white bg-black py-2">
        Note : using serverless worker in the backend, it shut down the server
        when no one visit for long time, so on the first visit it might take 1-2
        minutes of time to restart the service.{" "}
      </div>
      <Banner
        timer={timer}
        active={active}
        banner={banner}
        closeBanner={closeBanner}
      />
      <About active={active} />
      <Pricing active={active} />
      <Footer />
      {active && showJoyride ? (
        <Joyride
          callback={joyrideCB}
          continuous
          spotlightClicks
          steps={JOYRIDE_STEPS_FOR_GUEST}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Home;
