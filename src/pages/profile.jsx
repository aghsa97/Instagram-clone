import Header from "../components/header";
import useUser from "../hooks/use-user";
import { useEffect, useState } from "react";
import UserProfile from "../components/profile/indexProfile";
import { useParams } from "react-router";
import { getUserByUsername } from "../services/firebase";

const Profile = ({ user: loggedInUser }) => {
  const params = useParams();

  const { user } = useUser(loggedInUser?.uid || "");
  const [visitedUser, setvisitedUser] = useState({});

  useEffect(() => {
    document.title = `${user?.fullName || "Instagram"}`;
    async function getVisitedUserProfile() {
      const result = await getUserByUsername(params.username);
      setvisitedUser(result);
    }
    if (params?.username) getVisitedUserProfile();
  }, [user, params?.username]);
  return user ? (
    <div>
      <Header user={user} />
      <div
        className="mx-auto max-w-screen-lg
      "
      >
        <UserProfile user={user} visitedUser={visitedUser} />
      </div>
    </div>
  ) : (
    <Header user={user} />
  );
};

export default Profile;
