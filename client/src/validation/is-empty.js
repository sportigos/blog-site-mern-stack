//  Begin Date: 2020/05/23  Sat
const isEmpty = value => 
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0);
    
export default isEmpty;