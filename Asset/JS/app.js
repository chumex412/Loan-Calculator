 const form = document.getElementById("loan-form");
 const result = document.querySelector('.result');
 const container = document.querySelector('.container');
 // UI var
  const principalAmount = document.querySelector('#amountInput');
  const interest = document.querySelector('#interestInput');
  const period = document.querySelector('#periodInput');
  const monthlyPay = document.querySelector("#monthly-payment");
  const totalPay = document.querySelector("#total-payment");
  const totalInterest = document.querySelector("#total-interest");

 getLoanOutput();

 function getLoanOutput() {
  form.addEventListener('submit', function (e) {
    // Show loader
    document.querySelector('.loading').style.display = 'block';

    // Timer to show result
    setTimeout(calculateLoan, 2000);

    e.preventDefault();
  });
 }

 function calculateLoan() {

  const periodRate = (parseFloat(interest.value) / 100) / 12;
  const periodNumber = parseFloat(period.value) * 12;
  const amount = parseFloat(principalAmount.value);

  // Monthly payment
  const x = Math.pow(1 + periodRate, periodNumber);
  const monthly = (amount * x * periodRate) / (x - 1);

  // Hide loader
  document.querySelector('.loading').style.display = 'none';

  // Show result
  document.querySelector('.card-footer').style.display = 'block';

  if (isFinite(monthly)) {
    outputValues(monthly, periodNumber, amount);
  } else {
    showErrorMessage("Please check you number");
  }
 }

 // Output
 function outputValues(m, n, a) {
  // Calculated Output
  result.innerHTML = "Calculated result";
  monthlyPay.value  = m.toFixed(2);
  totalPay.value = (m * n).toFixed(2);
  totalInterest.value = ((m * n) - a).toFixed(2);
 }

 //Error message
 function showErrorMessage(message) {
  // Hide loader
  document.querySelector('.loading').style.display = 'none';
  // Hide result
  document.querySelector('.card-footer').style.display = 'none';

  let error = document.createElement('div');
  error.classList.add('error');
  error.appendChild(document.createTextNode(message));
  container.prepend(error);

  setTimeout(clearErrorMessage, 3000);
 }

 function clearErrorMessage() {
   document.querySelector('.error').remove();
 }