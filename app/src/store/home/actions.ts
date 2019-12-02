import {Dispatch} from 'redux';
import ScenicsFilter from '@/utils/ScenicsFilter';
import API from '@/api/api';

import Home from './type';
import {RootState} from '@/store/';
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
        let scenics = await API.getScenics();
        scenics = scenics.map((scenic: Scenic) => {
            scenic.periods = [];
            let i = 0;
            const dates: Array<string> = scenic.dates.split('-');
            while(i < dates.length){
                if(dates[i] && dates[i+1]){
                    scenic.periods.push([dates[i], dates[i+1]]);
                }
                i += 2;
            }
            return scenic;
        });

        console.log(scenics);

        dispatch({
            type: HOME_SET_YIKATONG_SCENICS,
            payload: scenics
        })
    }
}

export const setLoading = (isLoading: boolean) => ({
    type: HOME_SET_FILTERING_STATE,
    payload: isLoading,
})

/**
 * Apply Filters on scenics
 * @param filters 
 */
export const applyFilters = (filters: Filters) => (dispatch: Dispatch, getState: () => RootState) =>  {
    const {
        homeStore: {
            scenics
        }
    } = getState();

    dispatch(setLoading(true));

    setTimeout(()=>{
        // start filtering
        const filterTool = new ScenicsFilter();
        const filteredScenics: Array<Scenic> = filterTool.filterItems(scenics, filters)

        dispatch({
            type: HOME_SET_FILTERED_SCENICS,
            payload: filteredScenics
        })

        dispatch(setLoading(false));
    }, 1000)
}

/**
 * export all action creators
 */
export default {
    fetchAreas,
    fetchScenics,
    setLoading,
    applyFilters,
}

// ===============================
// Action Handlers
// ===============================
type Action = {type: string, payload: any};
export const ACTION_HANDLERS = {
    [HOME_SET_YIKATONG_SCENICS]: (state: Home, {payload}: Action): Home => Object.assign({}, state, {scenics: payload}),
    [HOME_SET_YIKATONG_AREAS]: (state: Home, {payload}: Action): Home => Object.assign({}, state, {areas: payload}),
    [HOME_SET_FILTERED_SCENICS]: (state: Home, {payload}: Action): Home => {
        return Object.assign({}, state, {filteredScenics: payload});
    },
    [HOME_SET_FILTERING_STATE]: (state: Home, {payload}: Action): Home => {
        return Object.assign({}, state, {isLoading: payload});
    }
}