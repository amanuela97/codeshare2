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
      user
      likes_count
      likes {
        username
        createdAt
      }
      comments_count
      comments {
        username
        createdAt
        userID
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
      user
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

const DELETE_IMAGE_MUTATION = gql`
  mutation deleteFile($public_id: String!){
  deleteFile(public_id: $public_id){
  	result
  }
} 
`;

const SUBMIT_COMMENT_MUTATION = gql`
  mutation($postId: String!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        userID
        username
      }
      commentCount
    }
  }
`;

const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body{
        public_id
        url
      }
      title
      description
      createdAt
      username
      user
      likeCount
      likes {
        username
        createdAt
      }
      commentCount
      comments {
        id
        username
        createdAt
        userID
        body
      }
    }
  }
`;

const FETCH_USER_POSTS_QUERY = gql`
query getUserPaginatedPosts($limit: Int!, $page: Int!, $sort: String!)  {
  getUserPaginatedPosts(limit: $limit, page: $page, sort: $sort) {
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
      user
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

const FETCH_USER = gql`
query getUser($id: ID!) {
  getUser(id: $id){
    id
    public_id
    url
    bio
    email
    username
    }
  }
`;


const UPDATE_USER = gql`
mutation updateUser($username: String!, $email: String!, $bio: String!, $public_id: String!, $url: String!) {
  updateUser(username: $username, email: $email, bio: $bio, public_id: $public_id, url: $url ){
    id
    public_id
    url
    bio
    email
    username
    }
  }
`;

const UPLOAD_FILE = gql`
mutation uploadFile($file: Upload!) {
  uploadFile(file: $file){
    url
    public_id
  }
  }
`;

const UPDATE_POST_MUTATION = gql`
  mutation updatePost($postId: ID!, $title: String!, $description: String!,  $hidden: Boolean! ) {
    updatePost(postId: $postId, title: $title, description: $description, hidden: $hidden) {
      id
      title
      createdAt
      description
      hidden
    }
  }
`;

const GET_MESSAGES = gql`
  subscription {
    messages {
      id
      content
      user
      createdAt
    }
  }
`;

const POST_MESSAGE = gql`
  mutation($user: String!, $content: String!) {
    postMessage(user: $user, content: $content)
  }
`;

export {
  REGISTER_USER, 
  LOGIN_USER, 
  FETCH_POSTS_QUERY,
  LIKE_POST_MUTATION,
  CREATE_POST_MUTATION,
  UPDATE_POST_MUTATION,
  DELETE_COMMENT_MUTATION,
  DELETE_POST_MUTATION,
  DELETE_IMAGE_MUTATION,
  FETCH_POST_QUERY,
  SUBMIT_COMMENT_MUTATION,
  FETCH_USER_POSTS_QUERY,
  FETCH_USER,
  UPDATE_USER,
  UPLOAD_FILE,
  GET_MESSAGES,
  POST_MESSAGE
}