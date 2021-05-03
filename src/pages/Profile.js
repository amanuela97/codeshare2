import React,{useState, useEffect} from "react";
import { Grid,Transition,Dropdown,Button } from 'semantic-ui-react';
import { useQuery } from '@apollo/react-hooks';
import { FETCH_USER_POSTS_QUERY } from '../utils/graphql.js';
import PostForm from '../components/PostForm.js'
import PostCard from '../components/postCard.js';
import ProfileCard from '../components/ProfileCard.js'
import {sortingOptions} from '../utils/sorting.js';

const Profile = () => { 
  const [sort, setSort] = useState('latest');
  const [pageNumber, setPageNumber] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);

  const pages = new Array(numberOfPages).fill(null).map((v, i) => i);


  const {loading, data , refetch} = useQuery(FETCH_USER_POSTS_QUERY,{
    variables: {limit: 1, page: pageNumber, sort: sort},
    onCompleted(){
      try {
        if(data){
          if(data.getUserPaginatedPosts.length > 0){
            setNumberOfPages(data.getUserPaginatedPosts[0].pageCount);
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    onError(err){
      try {
        throw Error(err);
      } catch (error) {
        console.log(error);
      }
    }
  });

  // when filters changes
  useEffect(() => {
    refetch({variable: {limit: 4, page: pageNumber, sort: sort}})
  }, [refetch, sort, pageNumber, data])

  const gotoPrevious = () => {
    setPageNumber(Math.max(0, pageNumber - 1));
  };

  const gotoNext = () => {
    setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
  };
 return (
    <Grid columns={1} divided="vertically" >
      <Grid.Column color="grey">
        <h1 className="page-title">My Page</h1>
        <Grid.Row className="topBarStyle">
          <PostForm />
          <Dropdown selection onChange={(e, { value }) => setSort(value)} placeholder='Sort' options={sortingOptions} />
        </Grid.Row>
      </Grid.Column>
      <Grid.Column width={4}>
          <ProfileCard/>
      </Grid.Column>
      {loading ? (
        <h1>Loading posts..</h1>
      ) : 
      (<Transition.Group>
        {data &&
              data.getUserPaginatedPosts.map((post) => (
                <Grid.Column width={8} className="postStyle" key={post.id}  >
                  <PostCard post={post} userID={post.user} refetch={refetch} />
                </Grid.Column>
              ))}
        </Transition.Group>)}

        <Grid.Row className="page-pagination" >
          <Button disabled={ (data) ? false : true} onClick={gotoPrevious}>Previous</Button>
          {pages.map((pageIndex) => (
            <Button key={pageIndex} onClick={() => setPageNumber(pageIndex)}>
              {pageIndex + 1}
            </Button>
          ))}
          <Button disabled={ (data) ? false : true} onClick={gotoNext}>Next</Button>
        </Grid.Row>
    </Grid>
  );
}


export default Profile;