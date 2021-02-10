import { GET_COUNT, COUNT_ERROR } from './types';
import api from '../utils/api';


export const getCount = (municipalityId,startDate = null,endDate = null) => async dispatch => {

    let body = null;
    
    if(startDate === null && endDate === null){
        body = { municipalityId };
    }
    else {
        body = { municipalityId, startDate, endDate}
    }

    try {
        const res = await api.post("/posts/getCountByMunicipality",body);
        
        dispatch ({
            type: GET_COUNT,
            payload: res.data
        });

    }
    catch(err){
        
        dispatch ({  
        type: COUNT_ERROR,
        payload: { msg: err.response.data }
        });   
    }
}