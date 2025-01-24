interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const printResult = (res: Result) => {
    console.log(res);
};

export const calculateExercises = (hoursPerDay: Array<number>): Result => {
    const target = <number>hoursPerDay.shift();

    const periodLength = hoursPerDay.length;
    const trainingDays = hoursPerDay.filter(h => h.valueOf() > 0).length;
    let success = true;
    hoursPerDay.forEach(h => {
        if (h < target) {
            success = false;
        }
    });
    const rating = success
        ? 3
        : trainingDays === 0
            ? 1
            : 2;
    const ratingDescription = rating === 1
        ? 'You haven\'t exercised at all'
        : rating === 2
            ? 'Could\'ve been better'
            : 'Well done!';
    let totalHours = 0;
    hoursPerDay.forEach(h => totalHours += h);
    const average = totalHours / periodLength;

    return({
        periodLength: periodLength,
        trainingDays: trainingDays,
        success: success,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: average
    });
};

const convertCliInput = (input: Array<string>): Array<number> => {
    const retVal: number[] = [];

    console.log(input);

    for (let i = 2; i < input.length; i++) {
        retVal.push(parseFloat(input[i]));
    }

    console.log(retVal);

    return retVal;
};

if (require.main === module)
    printResult(calculateExercises(convertCliInput(process.argv)));