import { useContext, useState } from "react";
import PropTypes from "prop-types";
import FirebaseContext from "../../context/firebase";
import LoggedInUserContext from "../../context/logged-in-user";
export default function AddComment({
  docId,
  comments,
  setcomments,
  commentInput,
  userusername,
}) {
  const [comment, setcomment] = useState("");
  const { firebase, FieldValue } = useContext(FirebaseContext);
  const {
    user: { username },
  } = useContext(LoggedInUserContext);

  const hnadleSubmitComment = (event) => {
    event.preventDefault();

    setcomments([...comments, { username, comment }]);
    setcomment("");
    return firebase
      .firestore()
      .collection("photos")
      .doc(docId)
      .update({
        comments: FieldValue.arrayUnion({ username, comment }),
      });
  };
  return (
    <div className="border-t border-gray-primary">
      <form
        action="POST"
        className="flex justify-between pr-5"
        onSubmit={(event) =>
          comment.length >= 1
            ? hnadleSubmitComment(event)
            : event.preventDefault()
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 16"
          className="w-8 ml-4 text-black-light select-none cursor-pointer focus:outline-none"
        >
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
          <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
        </svg>
        <input
          type="text"
          aria-label="add a comment"
          autoComplete="off"
          className="text-sm focus:outline-none text-gray-100 w-full mr-3 py-5 px-4"
          name="add-comment"
          placeholder="Add a comment..."
          value={comment}
          onChange={({ target }) => setcomment(target.value)}
          ref={commentInput}
        />
        <button
          className={`text-s font-semibold text-blue-medium ${
            !comment && "opecity-25"
          }`}
          type="button"
          disabled={comment.length < 1}
          onClick={hnadleSubmitComment}
        >
          Post
        </button>
      </form>
    </div>
  );
}

AddComment.propTypes = {
  comments: PropTypes.array.isRequired,
  docId: PropTypes.string.isRequired,
  setcomments: PropTypes.func.isRequired,
  commentInput: PropTypes.object.isRequired,
};
