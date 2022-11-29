export const relativePercentage = (number1: number, number2: number) => {
    return (100 * (number1 - number2) / number2).toFixed(2);
} 