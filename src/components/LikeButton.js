import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Button, Label, Icon } from 'semantic-ui-react';
import {LIKE_POST_MUTATION} from '../utils/graphql.js'
import Popup from '../utils/Popup';

const LikeButton = ({ user, post: { id, likes }, likeCount, refetch}) => {
  const [liked, setLiked] = useState(false);


  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
    onCompleted() {
      refetch();
    }
  });

  const likeButton = liked ? (
      <Button color="teal">
        <Icon name="like" />
      </Button>
    ) : (
      <Button color="teal" basic>
        <Icon name="like" />
      </Button>
    ) 

  return (
    <Button as="div" labelPosition="right" onClick={likePost}>
      <Popup content={liked ? 'Unlike' : 'Like'}>{likeButton}</Popup>
      <Label  color="teal" pointing="left">
        {likeCount}
      </Label>
    </Button>
  );
}

export default LikeButton;