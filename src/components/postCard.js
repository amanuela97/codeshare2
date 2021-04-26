import React, { useContext } from 'react';
import { Button, Card, Icon, Label, Image} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { AuthContext } from '../context/auth';

const PostCard = ({post: {body , title,createdAt, id, username, likes_count, comments_count, likes , description}}) => {
    const { user } = useContext(AuthContext);

  return (
    <Card color="teal" fluid>
      <Card.Content>
        <Image
          floated="right"
          size="massive"
          src={body.url}
        />
        <Card.Header>{title}</Card.Header>
        <Card.Meta>{username}</Card.Meta>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow(true)}
        </Card.Meta>
        <Card.Description>{description}</Card.Description>
      </Card.Content>
    </Card>
  );
}

export default PostCard;