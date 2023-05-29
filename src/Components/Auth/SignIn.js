  import { useNavigate } from "react-router-dom";
  import {
    signIn,
    signInWithGoogle,
    addUserInDatabase,
    checkIfUserExist,
  } from "../../library/firebase";
  import "./SignIn.css";
  import "../../Global.css";
  import { Link } from "react-router-dom";
  import Card from "./AuthCard";
  import { useState } from "react";

  const SignIn = () => {
    const navigate = useNavigate();
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const onEmailEnterHandler = (value) => {
      setemail(value);
    };

    const onPasswordEnterHandler = (value) => {
      setpassword(value);
    };

    const setUserInLocalStorage = (userInfo) => {
      const {
        user: { uid, email, picture, name, accessToken },
      } = userInfo;
      const userData = { uid, email, name, picture, accessToken };
      localStorage.setItem("user", JSON.stringify(userData));
    };

    const onSingInClickHandler = () => {
      signIn(email, password)
        .then((data) => {
          setUserInLocalStorage(data);
          navigate("/dashboard");
        })
        .catch((err) => setError(err.message));
    };

    const onLoginWithGoogleClickHandler = async () => {
      setIsLoading(true);
      signInWithGoogle()
        .then(async (data) => {
          const doesExist = await checkIfUserExist(data.user.uid);
          const userData = {
            user: {
              uid: data.user.uid,
              email: data.user.email,
              name: data.user.displayName,
              picture: data.user.photoURL,
              auth_provider: "google",
              accessToken: data.user.accessToken,
            },
          };

          setUserInLocalStorage(userData);
          if (!doesExist) {
            addUserInDatabase(data.user.uid, { ...userData.user });
            return navigate("/Dashboard");
          }
          return navigate("/Dashboard");
        })
        .catch((err) => setError(err.message))
        .finally(() => {
          setIsLoading(false);
        });
    };

    return (
      <div className=" background vh100 flex  justifyContent flexDirection alignItems">
        {error.length ? <h4 style={{ color: " #FFA07A" }}>{error}</h4> : ""}

        <Card
          isLoading={isLoading}
          email={email}
          onPasswordEnterHandler={onPasswordEnterHandler}
          onEmailEnterHandler={onEmailEnterHandler}
          OnclikcHandler={onSingInClickHandler}
          onLoginWithGoogleClickHandler={onLoginWithGoogleClickHandler}
          BtnText="Sign In"
          thirdField={false}
          googleBtnText="Google SignIn"
        />
        <h4>
          Did't Have Account <Link to="/signup">Create One</Link>
        </h4>
      </div>
    );
  };

  export default SignIn;
