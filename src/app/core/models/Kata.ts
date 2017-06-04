
export interface Kata {

    /** */
    _id: string;

    /** */
    name: string;

    /** */
    description: string;

    /** */
    examples: Array<string>;

    /** */
    inputs: Array<{parameter: string, description: string, type: string, constraints: Array<string>}>;

    /** */
    outputs: Array<{description: string, type: string, constraints: Array<string>}>;

    /** */
    initialBodyFunction: string;

    /** */
    enabled: boolean;

}
