# HandTevy
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


#My Flow

Start - Due Date = 1st Pay Date after Fund Day Loop Type = Forward 
1. Check if direct deposit 
yes -  go to 2
no - Due date +1 , Go to 2
2. Check if weekend 
Yes -  Go to 4
no - Go to 3
3. Check if holiday
yes - Loop type - reverse , go to 4
no - go to 5
4. Loop Type
Forward - Due date +1 , go to 2
Reverse - Due date -1 , go to 2
5.  Due Date >=
fund day + 10
days?
Yes - Return due date 
no - Go to 6
6. Due Date = next pay date Loop Type =
go to 1

Links: 
Demo - https://handtevy-duedate.netlify.app/



