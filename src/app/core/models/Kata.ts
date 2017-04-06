
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
    trainingPathId: string;

    /** */
    trainingPathName: string;

    /** */
    trainingPathDescription: string;

    /** */
    trainingPathKeys: Array<string>;

}