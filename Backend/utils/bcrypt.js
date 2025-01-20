import bcrypt from 'bcrypt'
export const hashPassword=(password)=>{
    const hashPassword=bcrypt.hashSync(password,10);
    return hashPassword;
}
export const comparePassword=(password,encrytedPassword)=>{
    
    const matched=bcrypt.compareSync(password,encrytedPassword)
    return matched
}
