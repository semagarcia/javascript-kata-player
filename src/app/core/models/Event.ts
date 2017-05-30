export interface Event {

    _id: string;
    name: string;
    description: string;
    date: {
        start: Date;
        end?: Date;
    };
    urlLoc?: string;
    enabled: boolean;

}