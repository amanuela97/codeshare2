import React,{useEffect, useState} from 'react';
import { Button, Form, Modal,Icon} from 'semantic-ui-react';
import {UPDATE_POST_MUTATION} from '../utils/graphql.js' 
import { useMutation } from '@apollo/react-hooks';
import {sortingOptions2} from '../utils/sorting.js';

import { useForm } from '../hooks/useForm.js';

const PostForm = ({refetch, postId}) => {
  const [visiblity, setVisibility] = useState();
  const [open, setOpen] = useState(false)
  const [error, setError] = useState('');
  const { values, onChange, onSubmit } = useForm(updatePostCallback, {
    title: '',
    description: '',
  });

  const [updatePost, { loading }] = useMutation(UPDATE_POST_MUTATION, {
    variables:{
      postId: postId,
      title: values.title,
      description: values.description,
      hidden: visiblity,
    },
    onCompleted(){
      values.title = "";
      values.description = "";
      values.body = "";
      refetch();
      setOpen(false);
    },
    onError(err) {
      try {
        console.log(err);
          if(err) {
            const errors = err.graphQLErrors.map(error => error.message);
            setError(errors)
            console.log(errors);
          } else {
              setError(err.graphQLErrors[0].message);
          }
      } catch (error) {
            console.log(error);
      }  
    },
  });

  function updatePostCallback () {  
    updatePost(); 
  }

  useEffect(()=> {

  },[updatePost])

  return (
    <>
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={ <Button
        as="div"
        color="yellow"
        floated="right"
      >
        <Icon name="edit" style={{ margin: 0 }} />
      </Button>
      }
    >
      <Modal.Content>
      <div>    
      <Form onSubmit={onSubmit} className={loading ? 'loading' : ''}>
        <h2>update post:</h2>
        <Form.Field>
          <Form.Input
            placeholder="title"
            name="title"
            required
            onChange={onChange}
            value={values.title}
          />

           <Form.Dropdown 
           selection onChange={(e, { value }) => setVisibility(value)} 
           placeholder='public' options={sortingOptions2} 
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
