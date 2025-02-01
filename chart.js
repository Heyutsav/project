document.addEventListener("DOMContentLoaded", () => {
  const incomeInput = document.getElementById("incomeInput");
  const expenseTargetInput = document.getElementById("expenseTargetInput");
  const alertMessage = document.getElementById("alertMessage");
  const expenseHistory = document.getElementById("expenseHistory");
  const ctx = document.getElementById("expensePieChart").getContext("2d");

  let income = 0;
  let expenseTarget = 0;
  let expenses = [];
  let pieChart = null;

  document.getElementById("setIncome").addEventListener("click", () => {
    income = parseFloat(incomeInput.value) || 0;
    alertMessage.textContent = `Income set to $${income.toFixed(2)}`;
  });

  document.getElementById("setExpenseTarget").addEventListener("click", () => {
    expenseTarget = parseFloat(expenseTargetInput.value) || 0;
    alertMessage.textContent = `Expense target set to $${expenseTarget.toFixed(2)}`;
  });

  document.getElementById("addExpense").addEventListener("click", () => {
    const category = document.getElementById("expenseCategory").value.trim();
    const amount = parseFloat(document.getElementById("expenseAmount").value) || 0;

    if (category && amount > 0) {
      expenses.push({ category, amount });
      const listItem = document.createElement("li");
      listItem.textContent = `${category}: $${amount.toFixed(2)}`;
      expenseHistory.appendChild(listItem);

      updatePieChart();

      document.getElementById("expenseCategory").value = "";
      document.getElementById("expenseAmount").value = "";

      const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
      if (expenseTarget > 0 && totalExpenses > expenseTarget) {
        alertMessage.textContent = `Warning: You exceeded your target of $${expenseTarget.toFixed(2)}!`;
      } else {
        alertMessage.textContent = "";
      }
    } else {
      alert("Please enter valid expense details.");
    }
  });

  function updatePieChart() {
    const categories = expenses.map(e => e.category);
    const amounts = expenses.map(e => e.amount);

    if (pieChart) pieChart.destroy();

    pieChart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: categories,
        datasets: [
          {
            data: amounts,
            backgroundColor: ["#4caf50", "#f44336", "#2196f3", "#ff9800", "#673ab7"],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "bottom" },
        },
      },
    });
  }
});
