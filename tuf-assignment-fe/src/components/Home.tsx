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
