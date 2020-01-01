import Scenic from '@/models/Scenic';

export default interface Home{
    title: string,
    areas: Array<string>,
    scenics: Array<Scenic>,
    filteredScenics: Array<Scenic>, // scenics to show on list view
    isLoading: false,
    version: string,
}