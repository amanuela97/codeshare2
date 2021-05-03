import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Button, Confirm, Icon } from 'semantic-ui-react';

import { DELETE_IMAGE_MUTATION, DELETE_POST_MUTATION, DELETE_COMMENT_MUTATION } from '../utils/graphql.js';
import Popup from '../utils/Popup.js';

const DeleteButton = ({ postId, commentId, callback, refetch, public_id }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

  const [deleteImage] = useMutation(DELETE_IMAGE_MUTATION, {
    onCompleted() {
      deletePostOrMutation()
    },
    variables: {
      public_id: public_id,
    }
  });

  const [deletePostOrMutation] = useMutation(mutation, {
    onCompleted() {
      setConfirmOpen(false);
      if(!commentId) {refetch()};
      if (callback) callback();
    },
    variables: {
      postId,
      commentId
    }
  });
  return (
    <>
      <Popup content={commentId ? 'Delete comment' : 'Delete post'}>
        <Button
          as="div"
          color="red"
          floated="right"
          onClick={() => setConfirmOpen(true)}
        >
          <Icon name="trash" style={{ margin: 0 }} />
        </Button>
      </Popup>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={commentId  ? deletePostOrMutation : deleteImage}
      />
    </>
  );
}


export default DeleteButton;