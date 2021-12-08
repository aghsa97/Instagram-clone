import { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import * as ROUTES from "../constents/routes";

const Login = () => {
  const history = useNavigate();
  const { firebase } = useContext(FirebaseContext);

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const [error, seterror] = useState("");
  const isInvaild = password === "" || email === "";

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      history(ROUTES.DASHBOARD);
    } catch (error) {
      setemail("");
      setpassword("");
      seterror(error.message);
    }
  };

  useEffect(() => {
    document.title = "Login - Instagram";
  }, []);

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5">
        <img src="/images/iphone-with-profile.jpg" alt="Iphone with profile" />
      </div>
      <div className="flex flex-col w-2/5">
        <div className="flex flex-col items-center bg-white p-8 border border-gray-primary mb-4">
          <h1 className="flex justify-center w-fulll">
            <img
              src="/images/logo.png"
              alt="instagram"
              className="mt-1 w-10/12 mb-8"
            />
          </h1>

          <form onSubmit={handleLogin} method="POST">
            <input
              type="text"
              aria-label="Enter your email address"
              placeholder="Email Address"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary focus:outline-none rounded mb-2 bg-gray-background"
              onChange={({ target }) => setemail(target.value)}
              value={email}
            />
            <input
              type="password"
              aria-label="Enter your password"
              placeholder="Enter Password"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary focus:outline-none rounded mb-2 bg-gray-background"
              onChange={({ target }) => setpassword(target.value)}
              value={password}
            />
            <button
              disabled={isInvaild}
              type="submit"
              className={`bg-blue-medium text-white w-full rounded h-8 font-bold mt-2 ${
                isInvaild && "opacity-50"
              }`}
            >
              Log In
            </button>
            {error && (
              <p className="mt-4 text-xs text-center text-red-primary">
                {error}
              </p>
            )}
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-5 rounded border border-gray-primary">
          <p className="text-sm">
            Don't have an account?{` `}
            <Link to={ROUTES.SIGN_UP} className="font-bold text-blue-medium">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
