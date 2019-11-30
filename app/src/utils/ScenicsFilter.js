import moment from 'moment';

class ScenicsFilter{

    keywordFilter = (items, keyword) => {
        return items.filter(item => { 
            return item.name.indexOf(keyword) > -1 || item.area_name.indexOf(keyword) > -1;
        })
    };

    areaFilter = (items, areas) => {
        return items.filter((item)=>{
            return areas.indexOf(item.area_id) > -1
        })
    };

    momentFilter = (items, start, end) => {
        const format = 'YYYY.M.D';
        if(!start && !end) return items;

        return items.filter(item => {
            if(moment(item.start, format).isSameOrBefore(end) && moment(item.end, format).isSameOrAfter(start)){
                return true;
            }else{
                return false;
            }
        })
    };

    filterItems = (items, filters) => {
        let newItems = items.slice();

        if(filters.keyword){
            newItems = this.keywordFilter(newItems, filters.keyword);
        }
        
        if(filters.areas && filters.areas.length){
            newItems = this.areaFilter(newItems, filters.areas);
        }

        if(filters.start && filters.end){
            newItems = this.momentFilter(newItems, filters.start, filters.end);
        }

        return newItems;
    };
}

export default ScenicsFilter