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
