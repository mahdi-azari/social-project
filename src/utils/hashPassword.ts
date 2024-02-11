import bcrypt from "bcrypt";

export const hashPassword = (password: string) => {
    const salt: string = bcrypt.genSaltSync(10);
    const hash: string = bcrypt.hashSync(password, salt);
    return hash;
};
