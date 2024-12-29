const cds = require('@sap/cds');
const { SELECT, DELETE } = cds.ql;

module.exports = async (req,res,next) => {
  if (req.user == undefined){
    const ipAddress = req.headers["x-forwarded-for"].split(",")[0];
    console.log(ipAddress);
    req.user = new cds.User("Dummy");
    if (ipAddress){
      const {UserSession} = (await cds.connect.to('CatalogService')).entities;
      const currentUserSessions = await SELECT.from(UserSession).where({ipAddress: ipAddress}).orderBy("createdAt");
      console.log(currentUserSessions);
      for(let userSession of currentUserSessions){
        const deltaLastSession = Math.ceil((new Date().getTime() - new Date(userSession.createdAt).getTime())/(1000*60));
        if (deltaLastSession < 10){ 
          // find active session -> login user
          console.log("active session");
          req.user = new cds.User(userSession.login);
        }
        else {
          req.user = new cds.User("Dummy");
          console.log("no active session");
          // delete expired sessions -> no login user
          await DELETE.from(UserSession).where({ID: userSession.ID});
        }
      }
    }
    else { req.user = new cds.User("Dummy"); } 
  }
  next()
}