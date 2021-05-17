//  Begin Date: 2020/05/24  Sun

exports.passwordValid = function(password, passwordConf) {
    if(password == passwordConf) {
        return true;
    } else {
        return false;
    }
}