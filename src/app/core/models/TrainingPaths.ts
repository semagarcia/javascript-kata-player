import { Kata } from './Kata';

export class TrainingPath {

    /** */
    topic: string;

    /** */
    name: string;

    /** */
    description: string;

    /** */
    katas: Array<Kata>;

    /** */
    enabled: boolean;

}