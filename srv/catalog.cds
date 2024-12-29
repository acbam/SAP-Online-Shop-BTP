using {online.store as db} from '../db/schema';

service CatalogService{
    entity Categories as projection on db.Category;
    entity SubCategories as projection on db.SubCategory;
    entity Products as projection on db.Product;
    entity ProductItems as projection on db.ProductItem;
    entity Orders as projection on db.Order;
    entity UserSession as projection on db.UserSession;
    entity Users as projection on db.User;
}

annotate CatalogService.Orders with @(restrict: [
    {
        grant: ['READ','CREATE'],
        where: 'createdBy = $user.id and $user.id != `Dummy`'
    }
]);
 