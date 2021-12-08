import PropTypes from "prop-types";
import { useEffect, useReducer } from "react";
//import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { getUserPhotosByUserId } from "../../services/firebase";
import PhotosProfile from "./photos";
import HeaderProfile from "./headerProfile";
import ProfileStories from "./storiesProfile";

const UserProfile = ({ user, visitedUser }) => {
  const reducer = (state, newState) => ({ ...state, ...newState });
  const initialState = {
    profile: {},
    photosCollection: [],
    followerCount: 0,
  };
  const [{ profile, photosCollection }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function getProfileInfoAndPhotoss() {
      const photos = await getUserPhotosByUserId(visitedUser.userId || "");
      dispatch({
        profile: visitedUser,
        photosCollection: photos,
      });
    }
    getProfileInfoAndPhotoss();
  }, [user, visitedUser]);
  return (
    <>
      <HeaderProfile
        photosCount={photosCollection.length}
        profile={profile}
        user={user}
      />
      <ProfileStories />
      <PhotosProfile photos={photosCollection} />
    </>
  );
};

export default UserProfile;

UserProfile.propTypes = {
  user: PropTypes.shape({
    dateCreated: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    followers: PropTypes.array.isRequired,
    following: PropTypes.array.isRequired,
    fullName: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
};
