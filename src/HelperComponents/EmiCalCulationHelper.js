
export function EmiCalCulationHelper(principalRemaning, annualInterestRate, tenureInMonths) {
    // Convert annual interest rate to monthly interest rate
    let monthlyInterestRate = (annualInterestRate / 12) / 100;

    // Calculate EMI using formula
    let emi = principalRemaning * monthlyInterestRate * 
                Math.pow(1 + monthlyInterestRate, tenureInMonths)
                / (Math.pow(1 + monthlyInterestRate, tenureInMonths) - 1);

    //calculating principal components 
    let emiResults = [];
          
    for(let i = 0; i<tenureInMonths; i++){
        let interest = principalRemaning*monthlyInterestRate;
        let gst = interest*18/100;
        
        let principalComponent = emi - interest;
        principalRemaning -= principalComponent;
        emiResults.push({principal:principalComponent,interest:interest,gst:gst,total:(gst + interest + principalComponent).toFixed(2)})
    }
    return emiResults; // Return EMI rounded to two decimal places
}