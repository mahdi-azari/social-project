export const validateUserInput = (userInput: any) => {
    const { firstName, lastName, userName } = userInput;
    if (
        !isNaN(Number(firstName)) ||
        !isNaN(Number(lastName)) ||
        !isNaN(Number(userName))
    ) {
        throw new Error("Do not enter a number");
    }
};
