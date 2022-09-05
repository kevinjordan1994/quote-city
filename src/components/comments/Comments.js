import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import { getAllComments } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";

import classes from "./Comments.module.css";
import NewCommentForm from "./NewCommentForm";
import CommentsList from "./CommentsList";

const Comments = (props) => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const { quoteId } = useParams();
  const {
    sendRequest: fetchComments,
    data: loadedComments,
    status,
    error,
  } = useHttp(getAllComments, true);

  useEffect(() => {
    fetchComments(quoteId);
  }, [fetchComments, quoteId]);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const addCommentHandler = useCallback(() => {
    fetchComments(quoteId);
  }, [quoteId, fetchComments]);

  let comments;

  if (status === "pending") {
    comments = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    comments = <p>{error}</p>;
  }

  if (status === "completed" && loadedComments.length === 0) {
    comments = <p>No comments yet... You could be first!</p>;
  } else if (status === "completed") {
    comments = <CommentsList comments={loadedComments} />;
  }

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm quoteId={quoteId} onAddComment={addCommentHandler} />
      )}
      {comments}
    </section>
  );
};

export default Comments;
