interface CheckboxListProps {
    options: string[];
    onCheckboxChange: (option: string) => void;
  }
  
  const CheckboxList = ({ options, onCheckboxChange }: CheckboxListProps) => {
    return (
      <div>
        {options.map((option, index) => (
          <div key={index} className='flex pl-1 space-x-4'>
            <input type="checkbox" id={option} name={option} value={option} onChange={() => onCheckboxChange(option)} />
            <label htmlFor={option}>{option}</label>
          </div>
        ))}
      </div>
    );
  };
  
  export default CheckboxList;
  