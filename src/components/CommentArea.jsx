import { useEffect, useState } from "react";
import CommentsList from "./CommentsList";
import AddComment from "./AddComment";
import { Alert } from "react-bootstrap";

const CommentArea = ({ asin }) => {

  /*   state = {
      comments: [],
      isLoading: false
    }; */

  const [comments, setComments] = useState('')
  const [isLoading, setIsLoading] = useState('')

  const fetchComments = async () => {
    setIsLoading(true);

    try {
      console.log("fetchComments");
      const resp = await fetch("https://striveschool-api.herokuapp.com/api/comments/" + asin, {
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjdkOGJkMzNhMzhjYjAwMTVmNjNkOTQiLCJpYXQiOjE3MTk1MDM4MjgsImV4cCI6MTcyMDcxMzQyOH0.L69pS2SihKdzx0zKj0_e0Ww3h7jzV1XnOHrGGpam96M"
        }
      });
      if (resp.ok) {
        const comments = await resp.json();
        // this.setState({comments: comments})
        setComments(comments); // sintassi equivalente alla precedente}
        console.log("comments:", comments);
      } else {
        throw new Error("Errore nel reperimento delle recensioni");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false); // sintassi equivalente alla precedente
    }
  };

  /* componentDidUpdate(prevProps) {
    console.log("componentDidUpdate (CommentArea)");
    console.log("PREV PROPS", prevProps.asin);
    console.log("THIS PROPS", this.props.asin);

    if (prevProps.asin !== this.props.asin) {
      console.log("asin diverso, avvio la fetch...");
      this.fetchComments();
    } else {
      console.log("asin non è diverso, mi fermo qui.");
    }
  } */

  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asin])

  // componentDidMount() {
  //   if (this.props.asin !== "") {
  //     console.log("componentDidMount (CommentArea)");
  //     this.fetchComments();
  //   }
  // }


  console.log("render (CommentArea)");
  return (
    <>
      <AddComment asin={asin} />
      {asin === "" ? (
        <Alert variant="light">👈 Seleziona un libro per vedere le recensioni</Alert>
      ) : (
        <CommentsList comments={comments} isLoading={isLoading} />
      )}
    </>
  );
}


export default CommentArea;
