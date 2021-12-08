import { useContext } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import LoggedInUserContext from "../context/logged-in-user";
import usePhotos from "../hooks/use-photos";
import Post from "./post";
import Stories from "./stories";

const Timeline = () => {
  const { user } = useContext(LoggedInUserContext);
  const { photos } = usePhotos(user);
  return (
    <div className=" container col-span-2">
      <Stories />
      {user?.following.length === 0 ? (
        <p className="text-center text-2xl">Follow people to see photos!</p>
      ) : !photos ? (
        <>
          <Skeleton count={1} width={640} height={600} className="mb-5" />
        </>
      ) : photos?.length > 0 ? (
        photos.map((content) => <Post key={content.docId} content={content} />)
      ) : (
        <p className="text-center text-2xl">Follow people to see photos!</p>
      )}
    </div>
  );
};

export default Timeline;
