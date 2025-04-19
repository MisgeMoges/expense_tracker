import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import History from "../../History/History";
import { InnerLayout } from "../../styles/Layouts";
import { dollar } from "../../utils/Icons";
import Chart from "../Chart/Chart";

function Dashboard() {
  const { incomes, expenses, getIncomes, getExpenses } = useGlobalContext();

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    getIncomes();
    getExpenses();
  }, []);

  const filterByDate = (items) => {
    return items.filter((item) => {
      const itemDate = new Date(item.date);
      const from = fromDate ? new Date(fromDate + "T00:00:00") : null;
      const to = toDate ? new Date(toDate + "T23:59:59") : null;

      if (from && itemDate < from) return false;
      if (to && itemDate > to) return false;

      return true;
    });
  };

  const filteredIncomes = filterByDate(incomes);
  const filteredExpenses = filterByDate(expenses);

  const totalIncome = () =>
    filteredIncomes.reduce((acc, item) => acc + item.amount, 0);
  const totalExpenses = () =>
    filteredExpenses.reduce((acc, item) => acc + item.amount, 0);
  const totalBalance = () => totalIncome() - totalExpenses();

  return (
    <DashboardStyled>
      <InnerLayout>
        <h1>All Transactions</h1>

        {/* --- Date Filters --- */}
        <div className="date-filters">
          <div>
            <label>From:</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>
          <div>
            <label>To:</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
        </div>

        <div className="stats-con">
          <div className="chart-con">
            <Chart />
            <div className="amount-con">
              <div className="income">
                <h2>Total Income</h2>
                <p>
                  {dollar} {totalIncome()}
                </p>
              </div>
              <div className="expense">
                <h2>Total Expense</h2>
                <p>
                  {dollar} {totalExpenses()}
                </p>
              </div>
              <div className="balance">
                <h2>Total Balance</h2>
                <p>
                  {dollar} {totalBalance()}
                </p>
              </div>
            </div>
          </div>

          <div className="history-con">
            <History />
            <h2 className="salary-title">
              Min <span>Salary</span>Max
            </h2>
            <div className="salary-item">
              <p>
                ${Math.min(...filteredIncomes.map((item) => item.amount), 0)}
              </p>
              <p>
                ${Math.max(...filteredIncomes.map((item) => item.amount), 0)}
              </p>
            </div>
            <h2 className="salary-title">
              Min <span>Expense</span>Max
            </h2>
            <div className="salary-item">
              <p>
                ${Math.min(...filteredExpenses.map((item) => item.amount), 0)}
              </p>
              <p>
                ${Math.max(...filteredExpenses.map((item) => item.amount), 0)}
              </p>
            </div>
          </div>
        </div>
      </InnerLayout>
    </DashboardStyled>
  );
}

const DashboardStyled = styled.div`
  .date-filters {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
    label {
      margin-right: 0.5rem;
    }
    input {
      padding: 0.3rem 0.5rem;
      border-radius: 5px;
      border: 1px solid #ccc;
    }
  }

  .stats-con {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 2rem;

    .chart-con {
      grid-column: 1 / 4;
      height: 400px;

      .amount-con {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 2rem;
        margin-top: 2rem;

        .income,
        .expense {
          grid-column: span 2;
        }

        .income,
        .expense,
        .balance {
          background: #fcf6f9;
          border: 2px solid #ffffff;
          box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
          border-radius: 20px;
          padding: 1rem;
          p {
            font-size: 2.5rem;
            font-weight: 700;
          }
        }

        .balance {
          grid-column: 1 / 4;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          p {
            color: var(--color-green);
            opacity: 0.6;
            font-size: 3.5rem;
          }
        }
      }
    }

    .history-con {
      grid-column: 4 / -1;

      h2 {
        margin: 1rem 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .salary-title {
        font-size: 1.2rem;
        span {
          font-size: 1.8rem;
        }
      }

      .salary-item {
        background: #fcf6f9;
        border: 2px solid #ffffff;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        padding: 1rem;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        p {
          font-weight: 600;
          font-size: 1.6rem;
        }
      }
    }
  }
`;

export default Dashboard;
