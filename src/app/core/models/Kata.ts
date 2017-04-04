export interface KataExercise {

    id: string;

    /** */
    name: string;

    /** */
    description: string;

    /** */
    example: string;

    /** */
    fnBodyImpl: string;

}

export interface KataMetadata {

    /** */
    keys: Array<String>;

}