import { memo } from "react";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";

const User = ({ username, fullName }) =>
  !username || !fullName ? (
    <Skeleton count={1} height={61} />
  ) : (
    <div>
      <Link
        to={`/${username}`}
        className="grid grid-cols-4 gap-4 mb-6 items-center"
      >
        <div className="flex items-center justify-between col-span-1">
          <img
            src={`/images/${username}.jpg`}
            alt="profile pic"
            className="rounded-full w-14 flex mr-3"
            onError={(e) => {
              e.target.src = `/images/default.png`;
            }}
          />
        </div>
        <div className="col-span-3">
          <p className="font-medium text-sm text-black-light">{username}</p>
          <p className="text-sm text-gray-base">{fullName}</p>
        </div>
      </Link>
    </div>
  );

User.propTypes = {
  username: PropTypes.string,
  fullName: PropTypes.string,
};

export default memo(User);
