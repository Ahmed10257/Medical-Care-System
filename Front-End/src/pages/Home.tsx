import { Fragment } from "react";
import Carousel from "../components/LandingPage/Carousel";
import LongCard from "../components/LandingPage/LongCard";
import Offers from "../components/LandingPage/Offers";
import LittleCard from "../components/LandingPage/LittleCard";
import { HeartPulse } from "lucide-react";

interface IProps {}
const Home = (props: IProps) => {
  console.log(props);
  return (
    <Fragment>
      <Carousel />
      <h5 className="text-left font-bold text-gray-500 text-3xl my-3">
        New Service for Better Health Care
      </h5>
      <LongCard
        imageURL="https://via.placeholder.com/800x400?text=1"
        title="Title 1"
        description="Description 1"
        button="Button 1"
      />
      <LongCard title="Title 2" description="Description 2" button="Button 2" />
      <LongCard
        imageURL="https://via.placeholder.com/800x400?text=3"
        title="Title 3"
        description="Description 3"
        button="Button 3"
      />
      <LongCard
        imageURL="https://via.placeholder.com/800x400?text=4"
        title="Title 4"
        description="Description 4"
        button="Button 4"
      />
      <Offers />
      <Offers />
      <div className="flex justify-between">
        <LittleCard
          type="card"
          header="header"
          title="title"
          icon={<HeartPulse />}
          message="Message"
          description="lorem ipsum dolor sit amet"
        />
        <LittleCard
          type="card"
          header="header"
          title="title"
          icon={<HeartPulse />}
          message="message"
          description="description"
        />
        <LittleCard
          type="card"
          header="header"
          title="title"
          icon={<HeartPulse />}
          message="message"
          description="description"
        />
        <LittleCard
          type="card"
          header="header"
          title="title"
          icon={<HeartPulse />}
          message="message"
          description="description"
        />
      </div>
    </Fragment>
  );
};

export default Home;
