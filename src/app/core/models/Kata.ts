
export interface Kata {

    /** */
    name: string;

    /** */
    description: string;

    /** */
    examples: Array<string>;

    /** */
    initialBodyFunction: string;

    /** */
    rawkata?: {
        /** */
        packageJson: string;

        /** */
        readme: string;

        /** */
        tests: string;

        /** */
        hiddenTests: string;
    };

    /** */
    enabled?: boolean;

}
