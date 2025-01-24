export const calculateBmi = (height: number, weight: number): string => {
    const bmi: number = 10000 * weight / (height * height);

    let result: string;

    if (bmi < 18.5)
        result = 'Underweight';
    else if (bmi >= 18.5 && bmi < 25)
        result = 'Normal weight';
    else if (bmi >= 25 && bmi < 30)
        result = 'Overweight';
    else
        result = 'Obese';

    return result;
};

const useCliInput = (input: Array<string>): string => {
    const values: number[] = [];

    for (let i = 2; i < input.length; i++) {
        values.push(parseFloat(input[i]));
    }

    return calculateBmi(values[0], values[1]);
};

if (require.main === module)
    console.log(useCliInput(process.argv));