import axios from 'axios'
import * as actionType from './actionType'
import ScenicsFilter from '../tools/ScenicsFilter'

export const fetchAreas = () => async (dispatch, getState) => {
    const response = await axios.get(`/json/areas.json`)

    dispatch({
        type: actionType.HOME_SET_YIKATONG_AREAS, 
        areas: response.data
    })
}

export const fetchScenics = () => async (dispatch, getState) => {
    const response = await axios.get(`/json/scenics.json`)

    const scenics = response.data.map(item => {
        let dates = item.dates.split('-')
        if(2 === dates.length){
            item.start = dates[0]
            item.end = dates[1]
        }
        return item
    })

    setTimeout(()=>{
        dispatch({
            type: actionType.HOME_SET_YIKATONG_SCENIC_SPOTS, 
            scenics
        })
    }, 1000);
}

export const applyFiltersUpdate = (filters) => (dispatch, getState) =>  {
    const {homeStore: {scenics}} = getState();

    dispatch(setFilteringState(true));

    setTimeout(()=>{
        // start filtering
        const filterTool = new ScenicsFilter();
        const filteredScenics = filterTool.filterItems(scenics, filters)

        dispatch({
            type: actionType.HOME_SET_FILTERED_SCENICS,
            scenics: filteredScenics
        })

        dispatch(setFilteringState(false));
    }, 1000)
}

export const setFilteringState = (isFiltering) => ({
    type: actionType.HOME_SET_FILTERING_STATE,
    isFiltering,
})