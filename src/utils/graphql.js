import gql from 'graphql-tag';

const REGISTER_USER = gql`
mutation registerUser(
  $username: String!
  $email: String!
  $password: String!
  $confirmPassword: String!
) {
  registerUser(
    username: $username
    email: $email 
    password: $password
    confirmPassword: $confirmPassword    
  ) {
    id
    email
    username
    createdAt
    token
    public_id
    url
    bio
  }
}
`;

const LOGIN_USER = gql`
mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

const FETCH_POSTS_QUERY = gql`
query getPaginatedPosts($limit: Int!, $page: Int!, $sort: String!)  {
    getPaginatedPosts(limit: $limit, page: $page, sort: $sort) {
      id
      title
      body {
        public_id
        url
      }
      description
      createdAt
      updatedAt
      username
      likes_count
      likes {
        username
        createdAt
      }
      comments_count
      comments {
        username
        createdAt
        body
      }
      pageCount
    }
  }
`;

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
        createdAt
      }
      likeCount
    }
  }
`;

const CREATE_POST_MUTATION = gql`
  mutation createPost($title: String!, $description: String!, $body: String!, $hidden: Boolean! ) {
    createPost(title: $title, description: $description, body: $body, hidden: $hidden) {
      id
      body{
        public_id
        url
      }
      title
      createdAt
      description
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`;

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

export {
  REGISTER_USER, 
  LOGIN_USER, 
  FETCH_POSTS_QUERY,
  LIKE_POST_MUTATION,
  CREATE_POST_MUTATION,
  DELETE_COMMENT_MUTATION,
  DELETE_POST_MUTATION
}