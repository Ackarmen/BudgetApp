const transactions = document.querySelector(".transactions");
const balanceNumber = document.querySelector(".balance-number");
const numberIncome = document.querySelector(".number--income");
const numberExpenses = document.querySelector(".number--expenses");
const form = document.querySelector(".form");
const inputDescription = document.querySelector(".input--description");
const inputAmount = document.querySelector(".input--amount");

function clickHandler(e) {
	// remove transaction item
	const clickedEl = e.target.parentNode;
	clickedEl.remove();

	// update incomes or expenses
	const amoutEl = clickedEl.querySelector(".transaction__amount");
	const amount = parseInt(amoutEl.textContent);

	if (amount > 0) {
		const curentIncomeNumber = +numberIncome.textContent;
		const updateIncomeNumber = curentIncomeNumber - amount;
		numberIncome.textContent = updateIncomeNumber;
	} else {
		const curentExpenseNumber = +numberExpenses.textContent;
		const updateExpenseNumber = curentExpenseNumber - amount * -1;
		numberExpenses.textContent = updateExpenseNumber;
	}

	// update balance
	const income = parseInt(numberIncome.textContent);
	const expenses = parseInt(numberExpenses.textContent);
	balanceNumber.textContent = income - expenses;

	// make red if balance negative
	if (income - expenses < 0) {
		// balanceNumber.style.color = "red"
		// or
		balanceNumber.classList.add("balance-number--negative"); // best way
	}
	// or
	// income - expenses < 0 ? balanceNumber.style.color = "red" : ''
}

function submitHandler(e) {
    // prevent default behavior
    e.preventDefault()

    // get inputs values
    const description = inputDescription.value
    const amount = parseInt(inputAmount.value)

    // create transaction item HTML
    const transactionItemHTML = `
    <li class="transaction transaction--${amount > 0 ? "income" : "expense"}">
        <span class="transaction__text">${description}</span>
        <span class="transaction__amount">${amount > 0 ? "+" : ""}${amount}</span>
        <button class="transaction__btn">X</button>
    </li>
    `

    // insert new HTML item
    transactions.insertAdjacentHTML('beforeend', transactionItemHTML)

    // clear form inputs
    inputDescription.value = ""
    inputAmount.value = ""
    
    // unfocus (blur) form inputs
    inputDescription.blur()
    inputAmount.blur()

    // update income or expenses
    if (amount > 0) {
		const curentIncomeNumber = +numberIncome.textContent;
		const updateIncomeNumber = curentIncomeNumber + amount;
		numberIncome.textContent = updateIncomeNumber;
	} else {
		const curentExpenseNumber = +numberExpenses.textContent;
		const updateExpenseNumber = curentExpenseNumber + amount * -1;
		numberExpenses.textContent = updateExpenseNumber;
	}

    // update balance
    const income = +numberIncome.textContent
    const expenses = +numberExpenses.textContent
    const updateBalance = income - expenses
    balanceNumber.textContent = updateBalance

    // make red if balance negative
	if (income - expenses < 0) {
		// balanceNumber.style.color = "red"
		// or
		balanceNumber.classList.add("balance-number--negative"); // best way
	}
	// or
	// income - expenses < 0 ? balanceNumber.style.color = "red" : ''
}

transactions.addEventListener("click", clickHandler);

form.addEventListener('submit', submitHandler)
