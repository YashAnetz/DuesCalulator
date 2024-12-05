import React, { useState,useEffect } from 'react';
import { PayDateCalculator } from './PayDateCalculator';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 
import './PayDateCalculatorApp.css'; 


const PayDateCalculatorComponent: React.FC = () => {
  const [fundDay, setFundDay] = useState<string>('');
  const [paySpan, setPaySpan] = useState<string>('weekly');
  const [payDay, setPayDay] = useState<string>('');
  const [hasDirectDeposit, setHasDirectDeposit] = useState<boolean>(false);
  const [dueDate, setDueDate] = useState<string | null>('Enter Date');
  const [logMessage, setLogMessage] = useState<string>('');
  const [logMessage1, setLogMessage1] = useState<string>('');
  const [logMessage2, setLogMessage2] = useState<string>('');
  const [logMessage3, setLogMessage3] = useState<string>('');
  const [logMessage4, setLogMessage4] = useState<string>('');
  const holidays = [
    new Date('2025-01-02'), 
    new Date('2024-12-26'),
    new Date('2025-01-22'), // I have added some sample holidays
  ];

  

  const handleCalculate = () => {
    const fundDateObj = new Date(fundDay);
    const payDateObj = new Date(payDay);

    const payDateCalculator = new PayDateCalculator();
    const calculatedDueDate = payDateCalculator.calculateDueDate(
      fundDateObj,
      holidays,
      paySpan,
      payDateObj,
      hasDirectDeposit,
      setLogMessage,
      setLogMessage1,
      setLogMessage2,
      setLogMessage3,
      setLogMessage4,

    );
   
    setDueDate(calculatedDueDate.toDateString());
  };



  // Mark holidays on the calendar
  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      // Check if the date is a holiday
      const isHoliday = holidays.some(holiday => holiday.toDateString() === date.toDateString());
      return isHoliday ? 'highlight-holiday' : ''; 
    }
    return '';
  };

  return (
    <div className='main'>
    <h1>Calculate Due Date</h1>
    <div className='flex-container'>
      <div className='g1'>
      <div>
        <label>
          Fund Day
          <input className='ip--style' type="date" value={fundDay} onChange={(e) => setFundDay(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Pay Span
          <select value={paySpan} onChange={(e) => setPaySpan(e.target.value)}>
            <option value="weekly">Weekly</option>
            <option value="bi-weekly">Bi-Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Pay Day
          <input type="date" className='ip--style' value={payDay} onChange={(e) => setPayDay(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Direct Deposit
          <div >
          <input
            type="checkbox"
            checked={hasDirectDeposit}
            onChange={(e) => setHasDirectDeposit(e.target.checked)}
          />
       
          </div>
        </label>
      
      </div>
      <button onClick={handleCalculate}>Calculate Due Date</button>
    </div>
    <div className='g2'>
      {dueDate && <div className='due--style'>Due Date: {dueDate}</div>}
      <h2>Logs</h2>
      {logMessage && <div className='logname--style'>{logMessage}</div>}
      {logMessage1 && <div className='logname--style'>{logMessage1}</div>}
      {logMessage2 && <div className='logname--style'>{logMessage2}</div>}
      {logMessage3 && <div className='logname--style'>{logMessage3}</div>}
      {logMessage4 && <div className='logname--style'>{logMessage4}</div>}
      <div>
        <h2>Logical Considerations</h2>
        <div className='logname--style'>Fund Day will be selected as Pay day if no pay day is specified</div>
        <div className='logname--style'>Pay Cycle considers current day for week , bi- weekly calculations</div>
      </div>
      </div>
      <div className='g3'>
        <h2>Holiday Calender</h2>
        <Calendar className='cal'
          tileClassName={tileClassName} 
        />
      </div>
      </div>
    </div>
  );
};

export default PayDateCalculatorComponent;
