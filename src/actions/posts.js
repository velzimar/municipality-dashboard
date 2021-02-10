import {GET_POSTS, POSTS_ERROR, DELETE_POST} from './types';
import api from '../utils/api';

export const getCurrentPosts= municipalityId => async dispatch => {

  const body = { municipalityId };
    try {
        const res = await api.post("/posts/getPostByMunicipality",body);
        
        dispatch ({
            type: GET_POSTS,
            payload: res.data
        });

    }catch(err){
        
        dispatch ({
            
     type: POSTS_ERROR,
     
        });   
    }
}

export const deletePost = (postId) => async dispatch => {
  const body = { postId };

  try {
    const res = await api.post('/posts/deletePost', body);

   
    dispatch({
      type: DELETE_POST,
      payload: res.data
    });
   
    

    
  } catch (err) {
    console.log(err);
    

    dispatch({
      type: POSTS_ERROR
    });
  }
};

