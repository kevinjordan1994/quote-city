import { useEffect, useRef } from "react";
import useHttp from "../../hooks/use-http";
import { addComment } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";

import classes from "./NewCommentForm.module.css";

const NewCommentForm = (props) => {
  const commentTextRef = useRef();
  const {
    sendRequest: sendNewComment,
    status,
    error,
  } = useHttp(addComment, false);
  const { onAddComment } = props;

  useEffect(() => {
    if (status === "completed" && !error) {
      onAddComment();
    }
  }, [status, error, onAddComment]);

  const submitFormHandler = (event) => {
    event.preventDefault();

    // optional: Could validate here

    // send comment to server
    const commentText = commentTextRef.current.value;

    sendNewComment({
      commentData: { text: commentText },
      quoteId: props.quoteId,
    });
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      {status === "pending" && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor="comment">Your Comment</label>
        <textarea id="comment" rows="5" ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className="btn">Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
