import { useState } from "react";
import PropTypes from "prop-types";
import { formatDistance } from "date-fns";
import { Link } from "react-router-dom";
import AddComment from "./add-comment";

export default function Comments({
  docId,
  comments: allComments,
  posted,
  commentInput,
}) {
  const commentsPreview = 2;
  const [comments, setcomments] = useState(allComments);
  const [commentsSlice, setCommentsSlice] = useState(commentsPreview);
  const showNextComments = () => {
    setCommentsSlice(commentsSlice + comments.length);
  };

  return (
    <>
      <div className="p-4 pt-1 pb-4">
        {comments.length >= commentsPreview && commentsSlice < comments.length && (
          <button
            className="text-sm text-gray-base mb-1 cursor-pointer focus:outline-none"
            type="button"
            onClick={showNextComments}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                showNextComments();
              }
            }}
          >
            View more {comments.length - commentsSlice} comments
          </button>
        )}
        {comments.slice(0, commentsSlice).map((item) => (
          <p key={`${item.comment}-${item.username}`} className="mb-1">
            <Link to={`/${item.username}`}>
              <span className="mr-1 font-semibold">{item.username}</span>
            </Link>
            <span>{item.comment}</span>
          </p>
        ))}

        <p className="text-gray-base uppercase text-xs mt-2">
          {formatDistance(posted, new Date())} ago
        </p>
      </div>
      <AddComment
        docId={docId}
        comments={comments}
        setcomments={setcomments}
        commentInput={commentInput}
      />
    </>
  );
}

Comments.propTypes = {
  docId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  posted: PropTypes.number.isRequired,
  commentInput: PropTypes.object.isRequired,
};
