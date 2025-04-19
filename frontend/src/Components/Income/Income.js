import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import { InnerLayout } from "../../styles/Layouts";
import Form from "../Form/Form";
import IncomeItem from "../IncomeItem/IncomeItem";

function Income() {
  const { addIncome, incomes, getIncomes, deleteIncome } = useGlobalContext();

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    getIncomes();
  }, []);

  // Filtered income records
  const filteredIncomes = incomes.filter((income) => {
    const incomeDate = new Date(income.date);
    const from = fromDate ? new Date(fromDate + "T00:00:00") : null;
    const to = toDate ? new Date(toDate + "T23:59:59") : null;

    if (from && incomeDate < from) return false;
    if (to && incomeDate > to) return false;

    return true;
  });

  // Calculate total from filtered incomes
  const filteredTotalIncome = filteredIncomes.reduce((total, income) => {
    return total + income.amount;
  }, 0);

  return (
    <IncomeStyled>
      <InnerLayout>
        <h1>Incomes</h1>

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
          Total Income: <span>${filteredTotalIncome.toFixed(2)}</span>
        </h2>

        <div className="income-content">
          <div className="form-container">
            <Form />
          </div>
          <div className="incomes">
            {filteredIncomes.map((income) => {
              const { _id, title, amount, date, category, description, type } =
                income;
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
                  deleteItem={deleteIncome}
                />
              );
            })}
          </div>
        </div>
      </InnerLayout>
    </IncomeStyled>
  );
}

const IncomeStyled = styled.div`
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

export default Income;
