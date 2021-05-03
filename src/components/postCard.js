import React, { useContext , } from 'react';
import { Button, Card, Icon, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { AuthContext } from '../context/auth';
import LikeButton from './LikeButton.js';
import DeleteButton from './DeleteButton.js';
import Popup from '../utils/Popup.js';
import UpdatePost from './UpdatePost.js'

const PostCard = ({post: {body , title,createdAt, id, username, likes_count, comments_count, likes , description}, refetch, userID}) => {
    const { user } = useContext(AuthContext);
  return (
    
    <Card color="teal" fluid >
      <Card.Content>
        <div style={{width: undefined, height: 210, padding: 10,}} >
          <img 
          src={body.url} 
          alt="post"
          style={{width: "100%", height: "100%", aspectRatio: 3/2}}
          />
        </div>
        <Card.Header >{title}</Card.Header>
        <Card.Meta>{username}</Card.Meta>
        <Card.Meta>
          {moment(createdAt).fromNow(true)}
        </Card.Meta>
        <Card.Description>{description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton user={user} post={{ id, likes }} likeCount={likes_count}  refetch={refetch} />
        <Popup content="Comment on post">
          <Button labelPosition="right" as={Link} to={`/posts/${id}`}>
            <Button color="teal" basic>
              <Icon name="comments" />
            </Button>
            <Label color="teal" pointing="left">
              {comments_count}
            </Label>
          </Button>
        </Popup>
        {user && user.id === userID && [<DeleteButton postId={id} refetch={refetch} public_id={body.public_id} key="1" />,   <UpdatePost refetch={refetch} postId={id} key="2"/>]}
      </Card.Content>
    </Card>
  );
}

export default PostCard;