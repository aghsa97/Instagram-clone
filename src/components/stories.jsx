import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllFollowedUsersProfiles } from "../services/firebase";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useContext } from "react";
import LoggedInUserContext from "../context/logged-in-user";

const Stories = () => {
  const [Profiles, setProfiles] = useState(null);
  const { user } = useContext(LoggedInUserContext);

  useEffect(() => {
    async function followersProfiles() {
      const response = await getAllFollowedUsersProfiles(
        user.userId,
        user.following
      );
      setProfiles(response);
    }

    if (user?.userId) {
      followersProfiles();
    }
  }, [user?.userId, user?.following]);

  return !Profiles ? (
    <Skeleton count={1} height={120} width={640} className="mb-6" />
  ) : (
    <div className="flex mb-6 bg-white border border-gray-primary h-28 p-2">
      <div className="flex items-center pt-2">
        {Profiles.map((profile) => (
          <Link
            key={profile.docId}
            to={`/${profile.username}`}
            className="item-center text-black-light"
          >
            <img
              className="rounded-full w-14 h-14 flex mr-3 ring ring-red-insta ring-offset-2 ml-3 mb-2"
              src={`/images/${profile.username}.jpg`}
              alt={`${profile.username} profile pic`}
              onError={(e) => {
                e.target.src = `/images/default.png`;
              }}
            />
            <p className="font-semibold text-xs text-center">
              {profile.username}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Stories;
