import { LoadingOutlined, StockOutlined } from "@ant-design/icons";
import { Button } from "./AuthCardBtn";
const Card = ({
  isLoading,
  email,
  onPasswordEnterHandler,
  onEmailEnterHandler,
  onConfirmPasswordEnterHandler,
  OnclikcHandler,
  onLoginWithGoogleClickHandler,
  BtnText,
  googleBtnText,
  thirdField,
}) => {
  return (
    <div
      className="borderRadius5px border2pxblue formContainer flex flexDirection justifyContent alignItems"
      style={{ background: "white" }}
    >
      <h1>
         <StockOutlined /> Trackeroo
      </h1>
      <input
        onChange={(e) => {
          onEmailEnterHandler(e.target.value);
        }}
        type="text"
        className="border2px borderRadius5px textAlign"
        placeholder="Enter Your Email"
      />

      <input
        onChange={(e) => {
          onPasswordEnterHandler(e.target.value);
        }}
        type="password"
        className=" border2px borderRadius5px textAlign"
        placeholder="Enter Your Password"
      />

      {thirdField ? (
        <input
          onChange={(e) => {
            onConfirmPasswordEnterHandler(e.target.value);
          }}
          type="password"
          className="border2px borderRadius5px textAlign"
          placeholder="Confirm Password"
        />
      ) : null}

      <Button
        isDisabled={email.length ? false : true}
        onClick={OnclikcHandler}
        className={email.length ? "SignInBtn" : "SignInBtn btnDisabled"}
        text={BtnText}
      />

      <h2>--------- or ---------</h2>

      <Button
        onClick={onLoginWithGoogleClickHandler}
        className="SignInBtn"
        text={isLoading ? <LoadingOutlined /> : googleBtnText}
      />
    </div>
  );
};

export default Card;
