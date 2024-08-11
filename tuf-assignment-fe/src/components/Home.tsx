import useBanner from "../hooks/useBanner";
import About from "./About";
import Banner from "./Banner";
// import ContentSection from "./Content";
import Footer from "./Footer";
import Pricing from "./Pricing";

const Home = () => {
  const { timer, active, banner, closeBanner } = useBanner();
  return (
    <div>
      <Banner
        timer={timer}
        active={active}
        banner={banner}
        closeBanner={closeBanner}
      />
      <About active={active} />
      {/* <ContentSection /> */}
      <Pricing active={active} />
      <Footer />
    </div>
  );
};

export default Home;
