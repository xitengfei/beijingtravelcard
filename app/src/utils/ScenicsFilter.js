import moment from 'moment';

class ScenicsFilter{
    isDateOverLaps(startDate, endDate, source){
        const format = 'YYYY.M.D';
        const t1 = moment(source[0], format);
        const t2 = moment(source[1], format);
 
        if(t1.isSameOrBefore(endDate) && t2.isSameOrAfter(startDate)){
            return true;
        }else{
            return false;
        }
    }

    keywordFilter = (items, keyword) => {
        return items.filter(item => { 
            return item.name.indexOf(keyword) > -1 || item.area_name.indexOf(keyword) > -1;
        })
    };

    areaFilter = (items, areas) => {
        if(!areas.length) return items;
        
        return items.filter((item)=>{
            return areas.indexOf(item.area_id) > -1
        })
    };

    momentFilter = (items, start, end) => {
        if(!start && !end) return items;

        return items.filter(item => {
            let {periods = []} = item;
            if(!item.dates) return true;

            let match = false;
            for(let period of periods){
                if(this.isDateOverLaps(start, end, period)){
                    match = true;
                    break;
                }
            }
            return match;
        });
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