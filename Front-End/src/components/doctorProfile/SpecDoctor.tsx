import { FC } from "react";
import { Link } from "react-router-dom";

interface IProps {
    specializes: string[];
}

const SpecDoctor: FC<IProps> = ({ specializes }) => {
    // Function to render specialization links
    const renderSpecLinks = () => {
        return (
            <>
                {specializes.map((item, index) => (
                    <span key={index}>
                        <Link to='' className="text-start hover:underline">{item}</Link>
                        {index < specializes.length - 1 && ', '}
                    </span>
                ))}
            </>
        );
    }

    return (
        <div>
            {renderSpecLinks()}
        </div>
    );
}

export default SpecDoctor;
