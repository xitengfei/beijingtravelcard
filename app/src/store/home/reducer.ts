import * as actionType from './action-type';
import Home from './type';

interface Action {
    readonly type: String;
    readonly payload: any;
}

const homeStore = (
    state: Home = {
        title:'',
        areas:[],
        scenics:[],
        isFiltering: false,
    }, 
    action: Action
) => {
    switch(action.type){
        case actionType.HOME_SET_YIKATONG_SCENICS:
            return Object.assign({}, state, {scenics: action.payload})
        case actionType.HOME_SET_YIKATONG_AREAS:
            return Object.assign({}, state, {areas: action.payload})
        // case actionType.HOME_SET_FILTERING_STATE:
        //     return Object.assign({}, state, {isFiltering: action.isFiltering})
        // case actionType.HOME_SET_FILTERED_SCENICS:
        //     return Object.assign({}, state, {filterdScenics: action.scenics})
        default:
            return state
    }
}

export default homeStore