import { useState, useEffect } from "react";

interface IProps {}

const Carousel = ({}: IProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [opacity, setOpacity] = useState(0);

  const items = [
    "https://www.businessintegrityservices.com/assets/images/what-is-emr-in-medical-billing.jpg",
    "https://media.australian.museum/media/dd/images/Innv_Tech-1774-NanoMslide-credit_Daniel_Calle.width-1600.e2819c1.jpg",
    "https://res.cloudinary.com/broadcastmed/image/fetch/q_auto,c_fill,w_1300,h_731,g_faces:center,f_auto/http%3A%2F%2F55933-bcmed.s3.amazonaws.com%2Fbcp%2Fimages%2ForlVideoAssets%2FimgSource%2Fdoctor-meeting-istock-832597756.jpg",
  ];

  const width = "1700px";
  const height = "700px";

  useEffect(() => {
    const interval = setInterval(() => {
      setOpacity(0);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
      }, 1000);
    }, 5000);

    return () => clearInterval(interval);
  }, [items.length]);

  useEffect(() => {
    setOpacity(1);
  }, [currentIndex]);

  return (
    <div className="carousel m-0 w-full flex justify-center items-center">
      <div
        className="carousel-item relative"
        style={{ transition: "opacity 1s", opacity, width, height }}
      >
        <img
          src={items[currentIndex]}
          alt={`Carousel Item ${currentIndex + 1}`}
          className="absolute inset-0 w-full h-full object-cover rounded-lg"
          style={{ width, height }}
        />
      </div>
    </div>
  );
};

export default Carousel;
