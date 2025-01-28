import {CoursePart} from '../types.ts';

const Common = ({name, exerciseCount}: { name: string, exerciseCount: number }): JSX.Element => (
    <div>
        <h4>{name}</h4>
        <p>exercises: {exerciseCount}</p>
    </div>
);

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const Part = ({part}: { part: CoursePart }): JSX.Element => {
    switch (part.kind) {
        case 'basic':
            return (
                <div>
                    <Common name={part.name} exerciseCount={part.exerciseCount} />
                    <p>{part.description}</p>
                </div>
            );
        case 'background':
            return (
                <div>
                    <Common name={part.name} exerciseCount={part.exerciseCount} />
                    <p>{part.description}</p>
                    <p>{part.backgroundMaterial}</p>
                </div>
            );
        case 'group':
            return (
                <div>
                    <Common name={part.name} exerciseCount={part.exerciseCount} />
                    <p>{part.groupProjectCount}</p>
                </div>
            );
        case 'special':
            return (
                <div>
                    <Common name={part.name} exerciseCount={part.exerciseCount} />
                    <p>required skills: {part.requirements.toString()}</p>
                </div>
            );
        default:
            return assertNever(part);
    }
}

export default Part;