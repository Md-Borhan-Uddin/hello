import CityList from "../../components/Home/CityList";
import HeroSection from '../../components/Home/Heroarea'
import Story from "../../components/Home/OurStory";

import PropatyList from "../../components/Home/ProrertiList";
import Testmonials from "../../components/Home/Testmonial";
import DefaultLayout from "./DefaultLayout";

export default function Home() {
  return (
    
      <>
        <HeroSection />

        <PropatyList />

        <CityList />

        <Story />

        <Testmonials />
      </>
    
  );
}
