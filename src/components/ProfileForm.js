import React,{useState} from 'react';
import { Button, Form, Modal, Icon } from 'semantic-ui-react';
import {UPDATE_USER, UPLOAD_FILE} from '../utils/graphql.js' 
import { useMutation } from '@apollo/react-hooks';
import { useForm } from '../hooks/useForm.js';

const PostForm = ({refetch}) => {
  const [open, setOpen] = useState(false)
  const [error, setError] = useState('');
  const [file, setFile] = useState([]);
  const [url, setUrl] = useState('');
  const [public_id, setPublic_id]= useState('');


  let ImageP = () => {
    if(file.file){ 
        return(
            <div key={file.name}>
                <div>
                    <img src={file.preview} style={{ 
                        width: 'auto',
                        height: 'auto', 
                        display: 'block',
                        maxHeight: 200,
                        maxWidth: 500,
                        padding: 5
                        }} alt="preview" />
                </div>
            </div>)
    }else {
       return <div style={{marginLeft: 20}}>preview here..</div>
    }
  };

  const { values, onChange, onSubmit } = useForm(updateProfileCallback, {
    username: '',
    email: '',
    bio: '',
  });

  const [uploadFile] = useMutation(UPLOAD_FILE,{
      variables: {
          file: file.file,
      },
      onCompleted(data){
            if(data.uploadFile){
                setPublic_id(data.uploadFile.public_id);
                setUrl(data.uploadFile.url);
            }
            console.log(values, url, public_id);
            updateProfile();

      },
      onError(err){
          console.log(err);
      }
  })


  const [updateProfile, { loading }] = useMutation(UPDATE_USER, {
    variables: {
        url: url,
        public_id: public_id,
        username: values.username,
        email: values.email,
        bio: values.bio,
    },
    onCompleted(){
      setFile('');
      values.username = "";
      values.email = "";
      values.bio= "";
      setError('');
      setOpen(false);
      refetch();
    },
    onError(err) {
      try {
        console.log(err);
          if(err) {
            const errors = err.graphQLErrors.map(error => error.message);
            setError(errors)
          } 
      } catch (error) {
            console.log(error);
      }  
    },
  });

  function updateProfileCallback () {  
    uploadFile()
  }
        
  const handleFileChange = e => {
    const file = e.target.files[0];
    if(!file) return
    setFile({
            preview: URL.createObjectURL(file),
            file: file,
        }     
    )
    
  }

  return (
    <>
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Icon name="edit" style={{ margin: 0 }} />}
    >
      <Modal.Content>
      <div>    
      <Form onSubmit={onSubmit} className={loading ? 'loading' : ''}>
        <h2>Edit Profile:</h2>
        <div style={{height: 250, color: "teal"}}>
            <input type="file" required onChange={handleFileChange}/>
            <div><ImageP/></div>
        </div>
        <Form.Field>
          <Form.Input
            placeholder="username"
            name="username"
            required
            onChange={onChange}
            value={values.username}
          />
          <Form.Input
            placeholder="email"
            required
            name="email"
            onChange={onChange}
            value={values.email}
          />
          <Form.TextArea
            placeholder="bio"
            name="bio"
            onChange={onChange}
            value={values.bio}
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