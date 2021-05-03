import {useState,useContext} from'react';
import { Card} from 'semantic-ui-react';
import { FETCH_USER } from '../utils/graphql.js';
import {useQuery} from '@apollo/react-hooks';
import { AuthContext } from '../context/auth.js';
import ProfileForm from '../components/ProfileForm.js'


const ProfileCard = () => {

    const [data, setData] = useState([]);
    const { user } = useContext(AuthContext);



    const {refetch} = useQuery(FETCH_USER, {
        variables: {id: user.id},
        onCompleted(dat){
            if(dat){
                setData(dat.getUser);
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


    if(!data) return (<h1>no data</h1>);

    return(  
        <Card color="teal">
            <div style={{width: undefined, height: 200, padding: 10, margin: "auto"}}>
                <img
                    src={data.url} 
                    alt="post"
                    style={{width: "100%", height: "100%", aspectRatio: 3/2}} 
                />
            </div>
            <Card.Content>
                <Card.Header>{data.username}</Card.Header>
                <Card.Meta>
                    <span className='email' style={{fontSize: "1.2vw", color:"teal"}}>{data.email}</span>
                </Card.Meta>
                <Card.Description>
                    <span style={{fontSize: "0.85vw"}}>{data.bio}</span>
                </Card.Description>
                <ProfileForm refetch={refetch} />
            </Card.Content>
        </Card>
    );
    
}

export default ProfileCard;