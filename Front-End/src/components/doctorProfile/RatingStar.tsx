import { FC } from "react";
import './style.css';

interface IProps {
  rating: number; 
  size?: number;
 
}

const RatingStar: FC<IProps> = ({ size = 24, rating}) => {
  const stars = Array.from({ length: 5 }, (_, index) => {
    if (index < Math.round(rating)) {
      return 'full';
    } else {
      return 'empty';
    }
  });

  return (
    <div className="star-rating" style={{  }}>
      {stars.map((type, index) => (
        <div
          key={index}
          className={`star ${type}`}
          style={{ width: size, height: size }}
        />
      ))}
    </div>
  );
}

export default RatingStar;
