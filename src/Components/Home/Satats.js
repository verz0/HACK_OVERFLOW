const Stats = ({ stats, title, bg }) => {
  return (
    <div className={bg}>
      <h2>{title}</h2>
      <h1>₹{stats}</h1>
    </div>
  );
};

export default Stats;
