import genReducer from '@/utils/genReducer';
import Home from './type';
import {ACTION_HANDLERS} from './actions';

const initState: Home = {
    title:'',
    areas:[],
    scenics:[],
    filteredScenics:[],
    isFiltering: false,
};

export default genReducer(initState, ACTION_HANDLERS)