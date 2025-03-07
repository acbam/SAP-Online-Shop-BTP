module.exports = function () {

    this.before("*", ["Orders", "Users"], (req) => {
        return req.user.is('user') || req.reject(403);
    });

    this.after("READ", "Users", (data) =>{
        if (Array.isArray(data)) {
            data.forEach(user => delete user.password);
        } else {
            delete data.password; 
        }
    });

}
