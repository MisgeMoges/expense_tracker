const {
  addExpense,
  getExpense,
  updateExpense,
  deleteExpense,
} = require("../controllers/expense");
const {
  addIncome,
  getIncomes,
  updateIncomes,
  deleteIncome,
} = require("../controllers/income");
const {
  addCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/category");

const router = require("express").Router();

router
  .post("/add-income", addIncome)
  .get("/get-incomes", getIncomes)
  .put("/update-income/:id", updateIncomes)
  .delete("/delete-income/:id", deleteIncome)
  .post("/add-expense", addExpense)
  .get("/get-expenses", getExpense)
  .put("/update-expense/:id", updateExpense)
  .delete("/delete-expense/:id", deleteExpense)
  .post("/add-category", addCategory)
  .get("/get-categories", getCategories)
  .put("/update-category/:id", updateCategory)
  .delete("/delete-category/:id", deleteCategory);

module.exports = router;
