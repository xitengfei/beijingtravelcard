import Area from '../../models/Area';
import Scenic from '../../models/Scenic';

export default interface Home{
    title: string,
    areas: Array<Area>,
    scenics: Array<Scenic>,
    filteredScenics: Array<Scenic>, // scenics to show on list view
    isFiltering: false
}