import { Link } from "react-router-dom";

const HeaderPost = ({ username }) => {
  return (
    <div className="flex border-b border-gray-primary h-4 p-4 py-8">
      <div className="flex items-center">
        <Link to={`/${username}`} className="flex item-center text-black-light">
          <img
            className="rounded-full w-8 h-8 flex mr-3"
            src={`/images/${username}.jpg`}
            alt={`${username} profile pic`}
          />
          <p className="font-semibold">{username}</p>
        </Link>
      </div>
    </div>
  );
};

export default HeaderPost;
