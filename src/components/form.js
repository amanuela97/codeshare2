import React, {useState} from 'react';

const Form = () =>{
    [user,setUser] = useState({
        username:'',
        email:'',
        password:'',
    });

    return (
        <Form>
            <input 
            placeholder='username'
            value={user.username} 
            onChange={}
            />
        
        </Form>
      );
}

export default Form;