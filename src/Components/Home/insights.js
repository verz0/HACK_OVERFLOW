import React from "react";
import { LoadingOutlined, NumberOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import Card from "./Card";
import Stats from "./Satats";

import {
  addEntryInDatabase,
  deleteEntryInDatabse,
  getUserEntryFromDatabase,
  updateEntryInDatabase,
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
  const user = JSON.parse(localStorage.getItem("user"));

  const isValidate = () => {
    if (!(title && amount && date && option)) {
      return alert(`Entry Can't Be Empty`);
    }
    return true;
  };

  useEffect(() => {
    setEntryData(entry);
  }, [entry]);

  const filterItems = (option) => {
    setEntryData(entry.filter((data) => data.option == option));
  };

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
    const expenseData = entry.filter((data) => data.option == "Expense");
    setExpense(
      expenseData.reduce((total, item) => {
        return total + parseInt(item.amount);
      }, 0)
    );
  }, [entry]);

  useEffect(() => {
    const incomeData = entry.filter((data) => data.option == "Income");
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
    }
  };

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
    
    


      {/* <div className="Add">
        <div className=" flex  AddContainer">
          <input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            type="text"
            placeholder="Title"
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
      </div> */}


{/* 
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
      </div> */}

      {/* <div className="Card_Container">
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
          <h1 style={{ opacity: 0.2, fontFamily: "monospace" }}>
            {isLoading ? <LoadingOutlined /> : "No Data To Show"}
          </h1>
        )}
      </div> */}
    </div>
  );
};

export default Dashboard;
