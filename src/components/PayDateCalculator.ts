export class PayDateCalculator {
  /**
   * Yash Ahire
   * Hello This is my logic understanding as per the problem statement
   * User selects Pay date,Fund Date,Pay span and Deposit type.
   * The paydate will be at least 10 days in the future from the fundDay. The
   * due date will fall on a day that is a pay date based on their pay date model
   * specified by 'paySpan' unless the date must be adjusted forward to miss a
   * weekend or backward to miss a holiday.
   *Parameters I have used
   * @param fundDay: Date - The day the loan was funded.
   * @param holidays: Date[] - An array of dates containing holidays.
   * @param paySpan: string - A string representing the frequency at which the customer is paid.
   * @param payDay: Date - A date containing one of the customer's paydays.
   * @param hasDirectDeposit: boolean - A boolean determining whether or not the customer receives their paycheck via direct deposit.
   */
  public calculateDueDate(fundDay: Date, holidays: Date[], paySpan: string, payDay: Date, hasDirectDeposit: boolean,
    setLogMessage: React.Dispatch<React.SetStateAction<string>>,
    setLogMessage1: React.Dispatch<React.SetStateAction<string>>,
    setLogMessage2: React.Dispatch<React.SetStateAction<string>>,
    setLogMessage3: React.Dispatch<React.SetStateAction<string>>,
    setLogMessage4: React.Dispatch<React.SetStateAction<string>> ): Date {
    // This maps days to selected days. 
    const addDays = (date: Date, days: number): Date => {
      const newDate = new Date(date);
      newDate.setDate(date.getDate() + days);
      console.log(newDate);
      return newDate;
    };

    //  This checks if day falls on a weekend.
    const isWeekend = (date: Date): boolean => {
      const day = date.getDay();
      return day === 0 || day === 6; // 0 is Sunday, 6 is Saturday
    };

    // This checks if day falls on a Holiday.
    const isHoliday = (date: Date, holidays: Date[]): boolean => {
      const isHolidayFound = holidays.some(holiday => holiday.getTime() === date.getTime());
      return isHolidayFound;
    };

    // function to calculate the next pay date based on paySpan
    const getNextPayDate = (lastPayDate: Date, paySpan: string): Date => {
      let nextPayDate = new Date(lastPayDate);
      switch (paySpan) {
        case 'weekly':
          nextPayDate = addDays(nextPayDate, 7); // For weekly, add 7 days
          break;
        case 'bi-weekly':
          nextPayDate = addDays(nextPayDate, 14); // For bi-weekly, add 14 days
          break;
        case 'monthly':
          nextPayDate.setMonth(nextPayDate.getMonth() + 1); // For monthly, add 1 month
          break;
        default:
          throw new Error('Invalid paySpan');
      }
      return nextPayDate;
    };

    //1: Calculate the due date to be at least 10 days after the fund day
    let dueDate = addDays(fundDay, 10); // Start at least 10 days after the fund date
    setLogMessage(`Initial due date after 10 days: ${dueDate.toDateString()}`);
    //setLogMessage(`Initial due date after 10 days (based on Fund Day): ${first.toDateString()}`);
    // 2: Ensure the due date is a valid pay date according to the paySpan 
    let nextPayDate = getNextPayDate(payDay, paySpan);
    console.log("Initial next pay date based on pay span: ", nextPayDate.toDateString());
    
    // 3: Ensure that the next pay date is the calculated due date
    if (nextPayDate <= dueDate) {
       // Recalculate pay date until it's after the due date
      while (nextPayDate <= dueDate){
        nextPayDate = getNextPayDate(nextPayDate, paySpan);
        
        
      }
      dueDate = nextPayDate
      
      
      setLogMessage1(`Due Date should be Pay date after 10 days: ${dueDate.toDateString()}`);
    } else
    {
      dueDate = nextPayDate 
    }
    //setLogMessage1(`Due Date Should be immediate Paydate after the 10 day condition: ${nextPayDate.toDateString()}`);
    // 4: If direct deposit is **not** enabled, add 1 day to the due date
    if (!hasDirectDeposit) {
      dueDate = addDays(dueDate, 1);
      console.log("Adjusted due date for non-direct deposit: ", dueDate.toDateString());
      setLogMessage2(`No Direct Deposit (+1 days) : ${dueDate.toDateString()}`);
    }

    // 5: Adjust the due date if it falls on a weekend or holiday
    while (isWeekend(dueDate) || isHoliday(dueDate, holidays)) {
      // If it's a weekend, move forward to the next business day
      if (isWeekend(dueDate)) {
        dueDate = addDays(dueDate, 1); // Move forward to Monday
        setLogMessage3(`If Weekend (+1 days) : ${dueDate.toDateString()}`);
      }
      // If it's a holiday, move backward to the previous business day
      if (isHoliday(dueDate, holidays)) {
        dueDate = addDays(dueDate, -1); // Move backward to the previous business day
        setLogMessage4(`If Holiday (-1 day) : ${dueDate.toDateString()}`);
      }
    }
    return dueDate;
  }
}
