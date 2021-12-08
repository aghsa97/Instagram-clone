import { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import * as ROUTES from "../constents/routes";
import { doesUsernameExists } from "../services/firebase";

const Signup = () => {
  const history = useNavigate();
  const { firebase } = useContext(FirebaseContext);

  const [username, setusername] = useState("");
  const [fullName, setfullName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const [error, seterror] = useState("");
  const isInvaild = password === "" || email === "";

  const handleSignup = async (event) => {
    event.preventDefault();

    const usernameExists = await doesUsernameExists(username);

    if (!usernameExists) {
      console.log("ADDING USER!");
      try {
        const createdUserResult = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);

        await createdUserResult.user.updateProfile({ displayName: username });

        await firebase.firestore().collection("users").add({
          userId: createdUserResult.user.uid,
          username: username.toLowerCase(),
          fullName,
          email: email.toLowerCase(),
          followers: [],
          following: [],
          dateCreated: Date.now(),
          caption: "",
        });
        console.log("USER BEEN ADDED TO DATABASE!");
        history(ROUTES.DASHBOARD);
      } catch (error) {
        setfullName("");
        setemail("");
        setpassword("");
        seterror(error.message);
      }
    } else {
      seterror("That username is already taken, please try another.");
    }
  };

  useEffect(() => {
    document.title = "Sign Up - Instagram";
  }, []);

  return (
    <div className="container flex mx-auto max-w-screen-md items-center mt-3 h-screen">
      <div className="flex flex-col w-80 mx-auto max-w-screen-md items-center">
        <div className="flex flex-col items-center bg-white p-8 border border-gray-primary mb-4">
          <h1 className="flex justify-center w-fulll">
            <img
              src="/images/logo.png"
              alt="instagram"
              className="mt-2 w-10/12 mb-2"
            />
          </h1>
          <h2 className="flex justify-center font-semibold text-gray-under text-center w-fulll mb-4">
            Sign up to see photos and videos from your friends.
          </h2>
          <form onSubmit={handleSignup} method="POST">
            <input
              type="text"
              aria-label="Enter your email address"
              placeholder="Email"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary focus:outline-none rounded mb-2 bg-gray-background"
              onChange={({ target }) => setemail(target.value)}
              value={email}
            />
            <input
              type="text"
              aria-label="Enter your Full Name"
              placeholder="Full Name"
              className="text-sm text-gray-bases w-full mr-3 py-5 px-4 h-2 border border-gray-primary focus:outline-none rounded mb-2 bg-gray-background"
              onChange={({ target }) => setfullName(target.value)}
              value={fullName}
            />
            <input
              type="text"
              aria-label="Enter your User Name"
              placeholder="Username"
              className="text-sm text-gray-bases w-full mr-3 py-5 px-4 h-2 border border-gray-primary focus:outline-none rounded mb-2 bg-gray-background"
              onChange={({ target }) => setusername(target.value)}
              value={username}
            />
            <input
              type="password"
              aria-label="Enter your password"
              placeholder="Password"
              className="text-sm text-gray-bases w-full mr-3 py-5 px-4 h-2 border border-gray-primary focus:outline-none rounded mb-2 bg-gray-background"
              onChange={({ target }) => setpassword(target.value)}
              value={password}
            />
            <button
              disabled={isInvaild}
              type="submit"
              className={`bg-blue-medium hover:bg-blue-medium text-white w-full rounded h-8 font-bold mt-2 ${
                isInvaild && "opacity-50"
              }`}
            >
              Next
            </button>
            {error && (
              <p className="mt-4 text-xs text-center text-red-primary">
                {error}
              </p>
            )}
            <h5 className="flex justify-center text-gray-under text-center text-xs w-fulll mt-5 mb-1">
              By signing up, you agree to our Terms . Learn how we collect, use
              and share your data in our Data Policy and how we use cookies and
              similar technology in our Cookies Policy .
            </h5>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-7 rounded border border-gray-primary">
          <p className="text-sm">
            Have an account?{` `}
            <Link
              to={ROUTES.LOGIN}
              className="font-bold text-blue-medium hover:text-blue-700"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
