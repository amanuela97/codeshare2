import React,{useState, useEffect} from "react";
import { Grid,Transition,Dropdown } from 'semantic-ui-react';
import { useQuery } from '@apollo/react-hooks';
import { FETCH_POSTS_QUERY } from '../utils/graphql.js';
import PostForm from '../components/PostForm.js'

import PostCard from '../components/postCard.js';

const sortingOptions = [
  {
    key: 'latest',
    text: 'latest',
    value: 'latest',
  },
  {
    key: 'oldest',
    text: 'oldest',
    value: 'oldest',
  },
  {
    key: 'likes',
    text: 'likes',
    value: 'likes',
  },
  {
    key: 'comments',
    text: 'comments',
    value: 'comments',
  },
]

const Home = () => { 
  const [sorting, setSorting] = useState('latest');
  const [pageNumber, setPageNumber] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [posts, setPosts] = useState([]);
  const pages = new Array(numberOfPages).fill(null).map((v, i) => i);

  const {loading, data , error, refetch} = useQuery(FETCH_POSTS_QUERY,{
    variables: {limit: 4, page: pageNumber, sort: sorting}
  });

  // when filters changes
  useEffect(() => {
    refetch({variable: {limit: 4, page: pageNumber, sort: sorting}});
    if(data) {
      console.log(data.getPaginatedPosts);
      setPosts(data.getPaginatedPosts)
      setNumberOfPages(data.getPaginatedPosts[0].pageCount)
    }
  }, [refetch, sorting, pageNumber, data])

  const gotoPrevious = () => {
    setPageNumber(Math.max(0, pageNumber - 1));
  };

  const gotoNext = () => {
    setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
  };

  if (error) {
    return <pre>{error}</pre> 
  } else return (
    <Grid columns={1} divided="vertically">
      <Grid.Column color="grey">
        <h1 className="page-title">Discovery</h1>
        <Grid.Row className="topBarStyle">
          <PostForm pageNumber={pageNumber} sorting={sorting}/>
          <Dropdown selection onChange={(e, { value }) => setSorting(value)} placeholder='Sort' options={sortingOptions} />
        </Grid.Row>
      </Grid.Column>
      {loading ? (
        <h1>Loading posts..</h1>
      ) : 
      (<Transition.Group>
        {posts &&
              posts.map((post) => (
                <Grid.Column width={8} className="postStyle" key={post.id} >
                  <PostCard post={post} />
                </Grid.Column>
              ))}
        </Transition.Group>)}
        <Grid.Row className="page-pagination">
          <button onClick={gotoPrevious}>Previous</button>
          {pages.map((pageIndex) => (
            <button key={pageIndex} onClick={() => setPageNumber(pageIndex)}>
              {pageIndex + 1}
            </button>
          ))}
          <button onClick={gotoNext}>Next</button>
        </Grid.Row>
    </Grid>
  );
}


export default Home;