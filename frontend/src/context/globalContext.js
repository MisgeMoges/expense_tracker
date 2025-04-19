import React, { useContext, useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  const addIncome = async (income) => {
    await axios.post(`${BASE_URL}add-income`, income).catch((err) => {
      setError(err.response.data.message);
    });
    getIncomes();
  };

  const getIncomes = async () => {
    const response = await axios.get(`${BASE_URL}get-incomes`);
    setIncomes(response.data);
  };

  const deleteIncome = async (id) => {
    await axios.delete(`${BASE_URL}delete-income/${id}`);
    getIncomes();
  };

  const addExpense = async (expense) => {
    await axios.post(`${BASE_URL}add-expense`, expense).catch((err) => {
      setError(err.response.data.message);
    });
    getExpenses();
  };

  const getExpenses = async () => {
    const response = await axios.get(`${BASE_URL}get-expenses`);
    setExpenses(response.data);
  };

  const deleteExpense = async (id) => {
    await axios.delete(`${BASE_URL}delete-expense/${id}`);
    getExpenses();
  };

  const totalIncome = (startDate = null, endDate = null) => {
    let total = 0;
    incomes.forEach((income) => {
      const incomeDate = new Date(income.createdAt);
      if (
        (!startDate || incomeDate >= new Date(startDate)) &&
        (!endDate || incomeDate <= new Date(endDate))
      ) {
        total += income.amount;
      }
    });
    return total;
  };

  const totalExpenses = (startDate = null, endDate = null) => {
    let total = 0;
    expenses.forEach((expense) => {
      const expenseDate = new Date(expense.createdAt);
      if (
        (!startDate || expenseDate >= new Date(startDate)) &&
        (!endDate || expenseDate <= new Date(endDate))
      ) {
        total += expense.amount;
      }
    });
    return total;
  };

  const totalBalance = (startDate = null, endDate = null) => {
    return totalIncome(startDate, endDate) - totalExpenses(startDate, endDate);
  };

  const transactionHistory = () => {
    const history = [...incomes, ...expenses];
    history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return history.slice(0, 3);
  };

  const addCategory = async (category) => {
    await axios.post(`${BASE_URL}add-category`, category).catch((err) => {
      setError(err.response.data.message);
    });
    getCategories();
  };

  const deleteCategory = async (id) => {
    await axios.delete(`${BASE_URL}delete-category/${id}`);
    getCategories();
  };

  const updateCategory = async (category) => {
    await axios
      .put(`${BASE_URL}update-category/${category.id}`, category)
      .catch((err) => {
        setError(err.response.data.message);
      });
    getCategories();
  };

  const getCategories = async () => {
    const response = await axios.get(`${BASE_URL}get-categories`);
    setCategories(response.data);
  };

  return (
    <GlobalContext.Provider
      value={{
        addIncome,
        getIncomes,
        incomes,
        deleteIncome,
        addExpense,
        getExpenses,
        expenses,
        deleteExpense,
        totalIncome,
        totalExpenses,
        totalBalance,
        transactionHistory,
        categories,
        addCategory,
        deleteCategory,
        updateCategory,
        getCategories,
        error,
        setError,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
