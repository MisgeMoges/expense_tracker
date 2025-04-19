import React, { useEffect } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import { InnerLayout } from "../../styles/Layouts";
import IncomeItem from "../IncomeItem/IncomeItem";
import CategoryForm from "./CategoryForm";

function Category() {
  const { categories, getCategories, deleteCategory } = useGlobalContext();

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <ExpenseStyled>
      <InnerLayout>
        <h1>Categories</h1>

        <div className="income-content">
          <div className="form-container">
            <CategoryForm />
          </div>
          <div className="incomes">
            {categories.map((cat) => {
              const { _id, title, description } = cat;
              console.log(cat);
              return (
                <IncomeItem
                  key={_id}
                  id={_id}
                  title={title}
                  description={description}
                  indicatorColor="var(--color-green)"
                  deleteItem={deleteCategory}
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

export default Category;
