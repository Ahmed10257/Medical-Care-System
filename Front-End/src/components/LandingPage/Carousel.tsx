import { useState, useEffect } from "react";

interface IProps {}

const Carousel = ({}: IProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [opacity, setOpacity] = useState(0);

  const items = [
    "https://via.placeholder.com/800x400?text=1",
    "https://via.placeholder.com/800x400?text=2",
    "https://via.placeholder.com/800x400?text=3",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setOpacity(0); // Start fading out
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
      }, 1000); // Wait for 1 second before changing the index
    }, 5000);

    return () => clearInterval(interval);
  }, [items.length]);

  useEffect(() => {
    setOpacity(1); // Start fading in
  }, [currentIndex]);

  return (
    <div className="carousel">
      <div
        className="carousel-item"
        style={{ transition: "opacity 1s", opacity }}
      >
        <img
          src={items[currentIndex]}
          alt={`Carousel Item ${currentIndex + 1}`}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default Carousel;
