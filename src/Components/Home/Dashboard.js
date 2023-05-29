import React, { useEffect, useState } from "react";
import { LoadingOutlined, NumberOutlined } from "@ant-design/icons";
import { notification } from "antd";
import Card from "./Card";
import Stats from "./Satats";

import {
  addEntryInDatabase,
  deleteEntryInDatabse,
  getUserEntryFromDatabase,
  updateEntryInDatabase,
  queryall
} from "../../library/firebase";

const Dashboard = () => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [option, setOption] = useState("");
  const [date, setDate] = useState("");
  const [entry, setEntry] = useState([]);
  const [curCard, setcurCard] = useState("");
  const [btnState, setbtnState] = useState(false);
  const [expense, setExpense] = useState(0);
  const [income, setIncome] = useState(0);
  const [entryData, setEntryData] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [budgets, setBudgets] = useState([]);
  const [budgetTitle, setBudgetTitle] = useState("");
  const [budgetAmount, setBudgetAmount] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  const isValidate = () => {
    if (!(title && amount && date && option)) {
      return alert(`Entry Can't Be Empty`);
    }
    return true;
  };

  const showNotification = (type, message, description) => {
    notification[type]({
      message: message,
      description: description,
    });
  };

  useEffect(() => {
    setEntryData(entry);
  }, [entry]);

  const filterItems = (option) => {
    setEntryData(entry.filter((data) => data.option === option));
  };

  queryall();

  const getUserEntry = React.useCallback(async () => {
    const results = await getUserEntryFromDatabase(user.uid);

    if (results.length) {
      setEntry([...results]);
    }
    setisLoading(false);
  }, [user.uid]);

  useEffect(() => {
    getUserEntry();
  }, [getUserEntry]);

  useEffect(() => {
    const expenseData = entry.filter((data) => data.option === "Expense");
    setExpense(
      expenseData.reduce((total, item) => {
        return total + parseInt(item.amount);
      }, 0)
    );
  }, [entry]);

  useEffect(() => {
    const incomeData = entry.filter((data) => data.option === "Income");
    setIncome(
      incomeData.reduce((total, item) => {
        return total + parseInt(item.amount);
      }, 0)
    );
  }, [entry]);

  const onDeleteHandler = (curCard) => {
    setcurCard(curCard);
    deleteEntryInDatabse(user.uid, curCard.id);
    setEntry(entry.filter((data) => data !== curCard));
    showNotification("success", "Changes Saved", "Successfully deleted.");
  };

  const onEditHandler = (curCard) => {
    setbtnState(true);
    setcurCard(curCard);
    setTitle(curCard.title);
    setAmount(curCard.amount);
    setOption(curCard.option);
    setDate(curCard.date);
    setEntry(entry.filter((data) => data.id !== curCard.id));
  };

  const onSaveChangesHandle = () => {
    const entriesData = {
      id: curCard.id,
      title,
      amount,
      option,
      date,
    };
    updateEntryInDatabase(user.uid, curCard.id, entriesData);
    setEntry([entriesData, ...entry]);
    setTitle("");
    setAmount("");
    setDate("");
    setOption("");
    setbtnState(false);
    showNotification("success", "Changes Saved", "Changes have been successfully entered.");
  };

  const onAddEntryHandler = () => {
    const validate = isValidate();
    if (validate) {
      const entriesData = {
        id: entry.length + 1,
        title,
        amount,
        option,
        date,
      };
      addEntryInDatabase(user.uid, entriesData);
      setEntry([entriesData, ...entry]);
      setbtnState(false);
      setTitle("");
      setAmount("");
      setDate("");
      setOption("");
      showNotification("success", "Entry Added", "Entry has been successfully added.");
    }
  };

  const onAddBudgetHandler = () => {
    const validate = isBudgetFormValid();
    if (validate) {
      const budgetData = {
        id: budgets.length + 1,
        title: budgetTitle,
        amount: budgetAmount,
      };
      setBudgets([budgetData, ...budgets]);
      setBudgetTitle("");
      setBudgetAmount("");
      showNotification("success", "Budget Added", "Budget has been successfully added.");
    }
  };

  const isBudgetFormValid = () => {
    if (!(budgetTitle && budgetAmount)) {
      return alert(`Budget Title and Amount are required.`);
    }
    return true;
  };

  useEffect(() => {
    const checkBudgetExceeded = () => {
      entry.forEach((entry) => {
        const budget = budgets.find((budget) => budget.title === entry.option);
        if (budget && parseInt(entry.amount) > parseInt(budget.amount)) {
          showNotification(
            "warning",
            "Budget Exceeded",
            `The budget "${budget.title}" has been exceeded.`
          );
        }
      });
    };

    checkBudgetExceeded();
  }, [entry, budgets]);

  return (
    <div className="Dashboard">
      <div className="statsCard">
        <Stats bg="Expense" title={"Expense"} stats={expense} />
        <Stats
          title="Balance"
          bg={income - expense < 0 ? "Expense" : "Balance Expense"}
          stats={income - expense}
        />
        <Stats bg="Expense Income" title={"Income"} stats={income} />
      </div>
      <div className="Add">
        <div className="flex AddContainer">
          <input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            type="text"
            placeholder="Title"
            style={{ "--placeholder-color": "white" }}
          />
          <input
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
            type="number"
            placeholder="Amount"
          />
          <input
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
            type="date"
            placeholder="Select Date"
          />
          <select
            style={{
              backgroundColor: "#7a7a7a",
              border: "2px solid #7a7a7a",
            }}
            value={option}
            onChange={(e) => {
              setOption(e.target.value);
            }}
          >
            <option value="Select">Select</option>
            <option value="Expense">Expense</option>
            <option value="Income">Income</option>
          </select>

          {btnState ? (
            <button
              className="statsbutton"
              onClick={() => {
                onSaveChangesHandle();
              }}
            >
              Save Changes
            </button>
          ) : (
            <button
              className="statsbutton"
              onClick={() => {
                onAddEntryHandler();
              }}
            >
              {option === "Expense" ? "Add Expense" : "Add Income"}
            </button>
          )}
        </div>
      </div>

      <div className="Budget">
        <div className="flex AddContainer">
          <input
            value={budgetTitle}
            onChange={(e) => {
              setBudgetTitle(e.target.value);
            }}
            type="text"
            placeholder="Budget Title"
            style={{ "--placeholder-color": "white" }}
          />
          <input
            value={budgetAmount}
            onChange={(e) => {
              setBudgetAmount(e.target.value);
            }}
            type="number"
            placeholder="Budget Amount"
          />
          <button
            className="statsbutton"
            onClick={() => {
              onAddBudgetHandler();
            }}
          >
            Add Budget
          </button>
        </div>
      </div>

      <div className="FilterContainer">
        <ul>
          <li
            onClick={() => {
              filterItems("Expense");
            }}
          >
            <NumberOutlined /> Expenses
          </li>
          <li
            onClick={() => {
              filterItems("Income");
            }}
          >
            <NumberOutlined /> Income
          </li>
          <li
            onClick={() => {
              setEntryData(entry);
            }}
          >
            <NumberOutlined /> All
          </li>
        </ul>
      </div>

      <div className="Card_Container">
        {entryData.length ? (
          entryData.map((data, index) => (
            <Card
              key={index}
              data={data}
              onDeleteHandler={onDeleteHandler}
              onEditHandler={onEditHandler}
            />
          ))
        ) : (
          <h1 style={{ opacity: 0.2, fontFamily: "monospace", color: "white" }}>
            {isLoading ? <LoadingOutlined /> : "No Data To Show"}
          </h1>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
