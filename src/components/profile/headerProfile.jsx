import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useParams } from "react-router";
import { isUserFollowingProfile, toggleFollow } from "../../services/firebase";

export default function HeaderProfile({
  photosCount,
  profile: {
    docId: profileDocId,
    userId: profileUserId,
    fullName,
    following = [],
    followers = [],
    username: profileUsername,
    caption: profileCaptions,
  },
  user,
}) {
  const params = useParams();
  const [isFollowingProfile, setisFollowingProfile] = useState(false);
  const activeUser = params.username && params.username === user.username;
  const activeBtnUser = params.username && params.username !== user.username;

  useEffect(() => {
    const isLoggedInUserFollowingProfile = async () => {
      const isFollowing = await isUserFollowingProfile(
        user.username,
        profileUserId
      );
      setisFollowingProfile(isFollowing);
    };
    if (user?.username && profileUserId) {
      isLoggedInUserFollowingProfile();
    }
  }, [user?.username, profileUserId]);

  const handleToggleFollow = async () => {
    setisFollowingProfile((isFollowingProfile) => !isFollowingProfile);
    isFollowingProfile
      ? (followers.length = followers.length - 1)
      : (followers.length = followers.length + 1);
    await toggleFollow(
      isFollowingProfile,
      profileDocId,
      profileUserId,
      user.docId,
      user.userId
    );
  };
  return (
    <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
      <div className="container flex justify-center items-center">
        <img
          src={`/images/${activeUser ? user.username : profileUsername}.jpg`}
          alt={`profile pic`}
          className="rounded-full h-44 w-44 flex"
          onError={(e) => {
            e.target.src = `/images/default.png`;
          }}
        />
      </div>
      <div className="flex items-center justify-cente flex-col col-span-2">
        <div className="container flex item-center mt-4">
          <p className="text-2xl mr-6 font-light">
            {activeUser ? user.username : profileUsername}
          </p>
          {activeBtnUser ? (
            !isFollowingProfile ? (
              <button
                className="bg-blue-medium font-semibold text-sm rounded text-white w-28 h-8"
                type="button"
                onClick={handleToggleFollow}
              >
                Follow
              </button>
            ) : (
              <button
                className="font-semibold text-sm rounded text-black-light border border-gray-primary w-24 h-8"
                type="button"
                onClick={handleToggleFollow}
              >
                Unfollow
              </button>
            )
          ) : (
            <button
              className="font-semibold text-sm rounded text-black-light border border-gray-primary w-24 h-8"
              type="button"
            >
              Edit Profile
            </button>
          )}
        </div>

        <div className="container flex mt-8">
          {!followers || !following ? (
            <Skeleton count={1} width={677} height={24} />
          ) : (
            <>
              <p className="mr-10">
                <span className="font-semibold">{photosCount}</span> posts
              </p>
              <p className="mr-10">
                <span className="font-semibold">{followers.length}</span>
                {` `}
                {followers.length === 1 ? `follower` : `followers`}
              </p>
              <p className="mr-10">
                <span className="font-semibold">{following?.length}</span>{" "}
                following
              </p>
            </>
          )}
        </div>
        <div className="container mt-8">
          <p className="font-medium">
            {!fullName ? (
              <Skeleton count={1} height={24} width={200} />
            ) : (
              fullName
            )}
          </p>
          <p className="font-light">
            {!profileCaptions ? null : profileCaptions}
          </p>
        </div>
      </div>
    </div>
  );
}

HeaderProfile.propTypes = {
  photosCount: PropTypes.number.isRequired,
  profile: PropTypes.shape({
    docId: PropTypes.string,
    userId: PropTypes.string,
    fullName: PropTypes.string,
    username: PropTypes.string,
    following: PropTypes.array,
    followers: PropTypes.array,
  }).isRequired,
};
