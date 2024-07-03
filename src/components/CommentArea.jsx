import { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import CommentList from "./CommentList";
import AddComment from "./AddComment";
// class CommentArea extends Component {
//   state = {
//     comments: [],
//     isLoading: false,
//     isError: false,
//   };

//   componentDidUpdate = async (prevProps) => {
//     if (prevProps.asin !== this.props.asin) {
//       this.setState({ isLoading: true });

//       try {
//         const resp = await fetch(
//           "https://striveschool-api.herokuapp.com/api/comments/" +
//             this.props.asin,
//           {
//             headers: {
//               Authorization:
//                 "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZiZmE2MTdjMjM5YzAwMTUyZjRiNDEiLCJpYXQiOjE3MTk0OTAxMzcsImV4cCI6MTcyMDY5OTczN30.qKiOJ1oiGi6orXP1et27zieWvuYCrTk0tWsu9y7U_qo",
//             },
//           }
//         );

//         if (resp.ok) {
//           let comments = await resp.json();
//           this.setState({
//             comments: comments,
//             isError: false,
//             isLoading: false,
//           });
//         } else {
//           this.setState({ isError: true, isLoading: false });
//         }
//       } catch (err) {
//         console.log(err);
//       } finally {
//         this.setState({ isLoading: false, isError: true });
//       }
//     }
//   };

//   // componentDidMount() {
//   //   this.fetchComments();
//   // }

//   render() {
//     return (
//       <div>
//         <h4>Commenti</h4>
//         {this.state.comments.length > 0 ? (
//           <CommentList comments={this.state.comments} />
//         ) : (
//           <Alert bg="info">non ci sono ancora commenti</Alert>
//         )}
//         <AddComment asin={this.props.asin} />
//       </div>
//     );
//   }
// }

const CommentArea = (props) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchComments = async () => {
    setIsLoading(true);
    try {
      const resp = await fetch(
        "https://striveschool-api.herokuapp.com/api/comments/" + props.asin,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZiZmE2MTdjMjM5YzAwMTUyZjRiNDEiLCJpYXQiOjE3MTk0OTAxMzcsImV4cCI6MTcyMDY5OTczN30.qKiOJ1oiGi6orXP1et27zieWvuYCrTk0tWsu9y7U_qo",
          },
        }
      );

      if (resp.ok) {
        setComments(await resp.json());
      } else {
        throw new Error("errore fetch");
      }
    } catch (err) {
      console.log(err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (props.asin) {
      console.log("updated");
      fetchComments();
    }
  }, [props.asin]);

  return (
    <div>
      <h4>Commenti</h4>
      {comments.length > 0 ? (
        <CommentList comments={comments} />
      ) : (
        <Alert variant="info">non ci sono ancora commenti</Alert>
      )}
      <AddComment asin={props.asin} />
    </div>
  );
};

export default CommentArea;
