import React,{useEffect, useState} from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
import {CREATE_POST_MUTATION} from '../utils/graphql.js' 
import { useMutation } from '@apollo/react-hooks';

import { useForm } from '../hooks/useForm.js';
import { FETCH_POSTS_QUERY } from '../utils/graphql.js';

const PostForm = ({pageNumber, sorting}) => {
  const [open, setOpen] = useState(false)
  const [error, setError] = useState('');
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    title: '',
    description: '',
    body: '',
    hidden: false,
  });

  const [createPost, { loading }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      let data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
        variables: {limit: 4, page: pageNumber, sort: sorting}
      });
      proxy.writeQuery({ query: FETCH_POSTS_QUERY, data: {
        getPaginatedPosts: [
            result.data.createPost, ...data.getPaginatedPosts
        ]
      }});
      values.body = '';
      values.title = '';
      values.description= '';
    },
    onError(err) {
    try {
        console.log(err);
        if(err) {
            setError(err.graphQLErrors[0].extensions[0].message);
        } else {
            setError(err.graphQLErrors[0].message);
        }
        } catch (error) {
          console.log(error);
    }  
    },
  });

  function createPostCallback () {  
    createPost();
    if(!error || !loading){
        setOpen(false);
    }   
  }

  useEffect(()=> {

  },[error])

  return (
    <>
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button>New Post</Button>}
    >
      <Modal.Content>
      <div>    
      <Form onSubmit={onSubmit} className={loading ? 'loading' : ''}>
        <h2>Create a post:</h2>
        <Form.Field>
          <Form.Input
            placeholder="title"
            name="title"
            required
            onChange={onChange}
            value={values.title}
          />
          <Form.TextArea
            placeholder="code here.."
            required
            name="body"
            onChange={onChange}
            value={values.body}
          />
          <Form.TextArea
            placeholder="description"
            name="description"
            required
            onChange={onChange}
            value={values.description}
          />
          <Button type="submit" color="teal" >
            Submit
          </Button>
        </Form.Field>
      </Form>
      { error && (
      <p className="ui error message">{error}</p>)}
      </div>
      </Modal.Content>
    </Modal>
    </>
  );
}

export default PostForm;
