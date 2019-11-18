interface Period{
    start: string,
    end: string,
}

export default interface Filters{
    keyword?: string,
    areas?: Array<string>,
    period?: Period
}