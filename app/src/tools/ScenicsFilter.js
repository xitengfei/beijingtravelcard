import moment from 'moment'
import {
    simpleDeepClone
} from '@/tools/objectHelper'

class ScenicsFilter{

    keywordFilter = (items, keyword) => {
        return items.filter(item => { 
            return item.name.indexOf(keyword) > -1 
        })
    };

    areaFilter = (items, areas) => {
        return items.filter((item)=>{
            return areas.indexOf(item.area_id) > -1
        })
    };

    momentFilter = (items, period) => {
        const format = 'YYYY.M.D'
        return items.filter(item => {
            console.log(item);
            if(!item.start || !item.end) return false;

            if(moment(item.start, format).isSameOrBefore(period.end) && 
            moment(item.end, format).isSameOrAfter(period.start))
            {
                return true;
            }else{
                return false;
            }
        })
    };

    filterItems = (items, filters) => {
        let newItems = simpleDeepClone(items);

        if(filters.keyword){
            newItems = this.keywordFilter(newItems, filters.keyword);
        }
        
        if(filters.checkedAreas && filters.checkedAreas.length){
            newItems = this.areaFilter(newItems, filters.checkedAreas);
        }

        if(filters.period && filters.period.start && filters.period.end){
            newItems = this.momentFilter(newItems, filters.period);
        }

        return newItems;
    };
}

export default ScenicsFilter