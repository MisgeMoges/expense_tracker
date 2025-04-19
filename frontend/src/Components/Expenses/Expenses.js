import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import { InnerLayout } from "../../styles/Layouts";
import IncomeItem from "../IncomeItem/IncomeItem";
import ExpenseForm from "./ExpenseForm";

function Expenses() {
  const { expenses, getExpenses, deleteExpense } = useGlobalContext();

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    getExpenses();
  }, []);

  const filteredExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    const from = fromDate ? new Date(fromDate + "T00:00:00") : null;
    const to = toDate ? new Date(toDate + "T23:59:59") : null;

    if (from && expenseDate < from) return false;
    if (to && expenseDate > to) return false;

    return true;
  });

  const totalFilteredExpense = () => {
    return filteredExpenses.reduce((acc, expense) => acc + expense.amount, 0);
  };

  return (
    <ExpenseStyled>
      <InnerLayout>
        <h1>Expenses</h1>

        <div className="filter-dates">
          <label>
            From:{" "}
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </label>
          <label>
            To:{" "}
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </label>
        </div>

        <h2 className="total-income">
          Total Expense: <span>${totalFilteredExpense()}</span>
        </h2>

        <div className="income-content">
          <div className="form-container">
            <ExpenseForm />
          </div>
          <div className="incomes">
            {filteredExpenses.map((expense) => {
              const { _id, title, amount, date, category, description, type } =
                expense;
              return (
                <IncomeItem
                  key={_id}
                  id={_id}
                  title={title}
                  description={description}
                  amount={amount}
                  date={date}
                  type={type}
                  category={category}
                  indicatorColor="var(--color-green)"
                  deleteItem={deleteExpense}
                />
              );
            })}
          </div>
        </div>
      </InnerLayout>
    </ExpenseStyled>
  );
}

const ExpenseStyled = styled.div`
  display: flex;
  overflow: auto;

  .filter-dates {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-bottom: 1rem;

    input {
      padding: 0.3rem;
      font-size: 1rem;
      border-radius: 8px;
      border: 1px solid #ccc;
    }
  }

  .total-income {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fcf6f9;
    border: 2px solid #ffffff;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
    margin: 1rem 0;
    font-size: 2rem;
    gap: 0.5rem;

    span {
      font-size: 2.5rem;
      font-weight: 800;
      color: var(--color-green);
    }
  }

  .income-content {
    display: flex;
    gap: 2rem;

    .incomes {
      flex: 1;
    }
  }
`;

export default Expenses;
