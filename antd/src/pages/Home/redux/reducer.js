import * as actionType from './actionType'

const homeStore = (
    state = {
        areas:[],
        scenics:[],
        isFiltering: false,
        filterdScenics: [],
    }, 
    action
) => {
    switch(action.type){
        case actionType.HOME_SET_YIKATONG_SCENIC_SPOTS:
            return Object.assign({}, state, {scenics: action.scenics})
        case actionType.HOME_SET_YIKATONG_AREAS:
            return Object.assign({}, state, {areas: action.areas})
        case actionType.HOME_SET_FILTERING_STATE:
            return Object.assign({}, state, {isFiltering: action.isFiltering})
        case actionType.HOME_SET_FILTERED_SCENICS:
            return Object.assign({}, state, {filterdScenics: action.scenics})
        default:
            return state
    }
}

export default homeStore