import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const Card = ({ data, onDeleteHandler, onEditHandler }) => {
  return (
    <div className=" Card">
      <h2>{data.title}</h2>
      <h3 className={data.option == "Expense" ? "red" : "green"}>
        {data.option == "Expense" ? `- ₹${data.amount}/-` : `+ ₹${data.amount}/-`}
      </h3>
      <h3>{data.date}</h3>
      <h3 className={data.option == "Expense" ? "red" : "green"}>
        {data.option == "Expense" ? `${data.option}` : `${data.option}`}
      </h3>
      <h3 style={{ color: "red", fontSize: "22px" }}>
        <DeleteOutlined onClick={() => onDeleteHandler(data)} />
      </h3>
      <h3 style={{ color: "blue", fontSize: "22px" }}>
        <EditOutlined onClick={() => onEditHandler(data)} />
      </h3>
    </div>
  );
};

export default Card;
