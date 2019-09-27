import Area from '../../models/Area';
import Scenic from '../../models/Scenic';

export default interface Home{
    title: string,
    areas: Array<Area>,
    scenics: Array<Scenic>,
    isFiltering: false
}