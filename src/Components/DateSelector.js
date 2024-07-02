import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateSelector = ({ onDateChange }) => {
  const [startDate, setStartDate] = useState();

  const handleChange = (date) => {
    setStartDate(date);
    onDateChange(date);
  };

  return (
    <div>
      <DatePicker 
        selected={startDate} 
        onChange={handleChange} 
        dateFormat="yyyy-MM-dd"
        isClearable
        placeholderText="Select a date"
      />
    </div>
  );
};

export default DateSelector;
