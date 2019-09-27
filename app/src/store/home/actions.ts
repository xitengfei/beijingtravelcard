import {Dispatch} from 'redux';
import * as actionType from './action-type';
import API from '../../api/api';

export const fetchAreas = function(){
    return async (dispatch:Dispatch): Promise<void> => {
        const areas = await API.getAreas();
        dispatch({
            type: actionType.HOME_SET_YIKATONG_AREAS,
            payload: areas
        })
    }
}

export const fetchScenics = function(){
    return async (dispatch:Dispatch): Promise<void> => {
        const scenics = await API.getScenics();
        dispatch({
            type: actionType.HOME_SET_YIKATONG_SCENICS,
            payload: scenics
        })
    }
}