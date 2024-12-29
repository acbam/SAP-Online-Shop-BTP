const cds = require('@sap/cds')

class AuthenticationService extends cds.ApplicationService {
    async init() {

        const { UserSession, Users } = this.entities;

        this.on("login", "", async req =>{
            const { username, password } = req.data;
            // credential store service?
            const user = await SELECT.one.from(Users).where({username: username, password: password});
            if (user){
                try {
                    // create new user session login
                    const ipAddress = req.headers["x-forwarded-for"];
                    await INSERT({username: username, ipAddress: ipAddress}).into(UserSession);
                    return true;
                }
                catch { return false; }
            }
            else { return false; }
        })

        return super.init();
    }
}

module.exports = { AuthenticationService };