using {online.store as db} from '../db/schema';

service AuthenticationService {
    entity UserSession as projection on db.UserSession;
    entity Users as projection on db.User;

    // Probably in a separate service?
    action login (username: String, password: String) returns Boolean;
    action logout (username: String) returns Boolean;
    action register (username: String, password: String) returns Boolean;
}

// annotate CatalogService.Orders with @(restrict: [
//     {
//         grant: ['READ','CREATE'],
//         where: 'createdBy = $user.id and $user.id != `Dummy`'
//     }
// ]);
 