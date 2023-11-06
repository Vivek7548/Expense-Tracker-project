const amountInput = document.getElementById("amount");
const descriptionInput = document.getElementById("description");
const categoryInput = document.getElementById("category");
const addExpenseButton = document.getElementById("addExpense");
const expenseList = document.getElementById("expenseList");

addExpenseButton.addEventListener("click", function() {
    const amount = parseFloat(amountInput.value);
    const description = descriptionInput.value;
    const category = categoryInput.value;

    if (isNaN(amount) || description === "") {
        alert("Please enter valid amount and description.");
        return;
    }

    const expense = {
        amount: amount,
        description: description,
        category: category
    };

    const li = document.createElement("li");
    li.innerHTML = `<strong>${description}</strong> - ${amount} (${category}) <button class="edit">Edit</button> <button class="delete">Delete</button>`;
    expenseList.appendChild(li);

    // Save expense to local storage
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    expenses.push(expense);
    localStorage.setItem("expenses", JSON.stringify(expenses));

    amountInput.value = "";
    descriptionInput.value = "";
    categoryInput.value = "food";
});

expenseList.addEventListener("click", function(event) {
    if (event.target.classList.contains("edit")) {
        const li = event.target.parentElement;
        const index = Array.from(expenseList.children).indexOf(li);
        const expenses = JSON.parse(localStorage.getItem("expenses"));
        const editedExpense = expenses[index];

        amountInput.value = editedExpense.amount;
        descriptionInput.value = editedExpense.description;
        categoryInput.value = editedExpense.category;

        expenses.splice(index, 1);
        localStorage.setItem("expenses", JSON.stringify(expenses));
        li.remove();
    } else if (event.target.classList.contains("delete")) {
        const li = event.target.parentElement;
        const index = Array.from(expenseList.children).indexOf(li);
        const expenses = JSON.parse(localStorage.getItem("expenses"));

        expenses.splice(index, 1);
        localStorage.setItem("expenses", JSON.stringify(expenses));
        li.remove();
    }
});