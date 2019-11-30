import {Dispatch} from 'redux';
import * as actionType from './action-type';
import ScenicsFilter from '@/tools/ScenicsFilter';
import API from '@/api/api';

import Home from './type';
import Filters from '@/models/Filters';
import Scenic from '@/models/Scenic';

// ===============================
// Action Type
// ===============================
export const HOME_SET_YIKATONG_SCENICS = 'HOME_SET_YIKATONG_SCENICS'
export const HOME_SET_YIKATONG_AREAS = 'HOME_SET_YIKATONG_AREAS'
export const HOME_SET_FILTERING_STATE = 'HOME_SET_FILTERING_STATE'
export const HOME_SET_FILTERED_SCENICS = 'HOME_SET_FILTERED_SCENICS'


// ===============================
// Action Creator
// ===============================
export const fetchAreas = function(){
    return async (dispatch:Dispatch): Promise<void> => {
        const areas = await API.getAreas();
        dispatch({
            type: HOME_SET_YIKATONG_AREAS,
            payload: areas
        })
    }
}

export const fetchScenics = function(){
    return async (dispatch:Dispatch): Promise<void> => {
        const scenics = await API.getScenics();
        dispatch({
            type: HOME_SET_YIKATONG_SCENICS,
            payload: scenics
        })
    }
}

export const setFilteringState = (isFiltering: boolean) => ({
    type: HOME_SET_FILTERING_STATE,
    payload: isFiltering,
})

export const applyFiltersUpdate = (filters: Filters) => (dispatch: Dispatch, getState: any) =>  {
    const {
        homeStore: {
            scenics
        }
    } = getState();

    dispatch(setFilteringState(true));

    setTimeout(()=>{
        // start filtering
        const filterTool = new ScenicsFilter();
        const filteredScenics: Array<Scenic> = filterTool.filterItems(scenics, filters)

        dispatch({
            type: HOME_SET_FILTERED_SCENICS,
            scenics: filteredScenics
        })

        dispatch(setFilteringState(false));
    }, 1000)
}


export default {
    fetchAreas,
    fetchScenics,
    setFilteringState,
    applyFiltersUpdate,
}


// ===============================
// Action Handlers
// ===============================
type Action = {
    type: string,
    payload: any
};
export const ACTION_HANDLERS = {
    [HOME_SET_YIKATONG_SCENICS]: (state: Home, {payload}: Action): Home => Object.assign({}, state, {scenics: payload}),
    [HOME_SET_YIKATONG_AREAS]: (state: Home, {payload}: Action): Home => Object.assign({}, state, {areas: payload})
}