import React, { useContext, useState, useRef } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import moment from 'moment';
import UpdatePost from '../components/UpdatePost.js'
import {
  Button,
  Card,
  Form,
  Grid,
  Image,
  Icon,
  Label
} from 'semantic-ui-react';

import { AuthContext } from '../context/auth.js';
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';
import Popup from '../utils/Popup.js';
import {FETCH_POST_QUERY,SUBMIT_COMMENT_MUTATION} from '../utils/graphql.js'

const PostItem = (props) => {
  const postId = props.match.params.postId;
  const { user } = useContext(AuthContext);
  const commentInputRef = useRef(null);

  const [comment, setComment] = useState('');
  const {
    data,
    refetch
  } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId: postId
    },
    onError(err){
        console.log(err);
    }
  });

  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update() {
      setComment('');
      commentInputRef.current.blur();
    },
    variables: {
      postId,
      body: comment
    }
  });



  function deletePostCallback() {
    props.history.push('/');
  }

  let postMarkup;
  if (!data) {
    postMarkup = <p>Loading post..</p>;
  } else {
    const {
      id,
      body,
      createdAt,
      username,
      user:userID,
      comments,
      likes,
      description,
      likeCount,
      commentCount
    } = data.getPost;

    postMarkup = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={5}>
            <Image
              src={body.url}
              size="massive"
              floated="right"
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{description}</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                <LikeButton user={user} post={{ id, likes }} likeCount={likeCount} refetch={refetch} />
                <Popup content="Comment on post">
                  <Button
                    as="div"
                    labelPosition="right"
                    onClick={() => console.log('Comment on post')}
                  >
                    <Button basic color="teal">
                      <Icon name="comments" />
                    </Button>
                    <Label  color="teal" pointing="left">
                      {commentCount}
                    </Label>
                  </Button>
                </Popup>
                {user && user.id === userID && (
                  [<DeleteButton public_id={body.public_id} postId={id} callback={deletePostCallback} refetch={refetch} key="1" />, <UpdatePost refetch={refetch} postId={id} key="2"/>]
                )}
              </Card.Content>
            </Card>
            {user && (
              <Card fluid>
                <Card.Content>
                  <p>Post a comment</p>
                  <Form>
                    <div className="ui action input fluid">
                      <input
                        type="text"
                        placeholder="Comment.."
                        name="comment"
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                        ref={commentInputRef}
                      />
                      <button
                        type="submit"
                        className="ui button teal"
                        disabled={comment.trim() === ''}
                        onClick={submitComment}
                      >
                        Submit
                      </button>
                    </div>
                  </Form>
                </Card.Content>
              </Card>
            )}
            {comments.map((comment) => (
              <Card fluid key={comment.id}>
                <Card.Content>
                  {user && user.id === comment.userID && (
                    <DeleteButton postId={id} commentId={comment.id} refetch={refetch} />
                  )}
                  <Card.Header>{comment.username}</Card.Header>
                  <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                  <Card.Description>{comment.body}</Card.Description>
                </Card.Content>
              </Card>
            ))}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
  return postMarkup;
}


export default PostItem;