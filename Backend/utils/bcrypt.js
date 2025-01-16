const bcrypt=require("bcrypt")
const hashPassword=(password)=>{
    const hashPassword=bcrypt.hashSync(password,10);
    return hashPassword;
}
const comparePassword=(password,encrytedPassword)=>{
    //to hash
    const matched=bcrypt.compareSync(password,encrytedPassword)
    return matched
}
module.exports={hashPassword,comparePassword}
