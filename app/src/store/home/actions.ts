import {Dispatch} from 'redux';
import * as actionType from './action-type';
import Filters from '../../models/Filters';
import Scenic from '../../models/Scenic';
import ScenicsFilter from '../../tools/ScenicsFilter';
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

export const setFilteringState = (isFiltering: boolean) => ({
    type: actionType.HOME_SET_FILTERING_STATE,
    isFiltering,
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
            type: actionType.HOME_SET_FILTERED_SCENICS,
            scenics: filteredScenics
        })

        dispatch(setFilteringState(false));
    }, 1000)
}