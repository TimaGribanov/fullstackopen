import Part from './Part.tsx';
import {CoursePart} from '../types.ts';

const Content = ({courseParts}: { courseParts: CoursePart[] }): JSX.Element => {
    return (
        <div>
            {courseParts.map(part => <Part key={part.name} part={part} />)}
        </div>
    )
}

export default Content;