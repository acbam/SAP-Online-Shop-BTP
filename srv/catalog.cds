using {online.store as db} from '../db/schema';
 
service CatalogService {
    entity Categories as projection on db.Category;
    entity SubCategories as projection on db.SubCategory;
    entity Products as projection on db.Product;
    entity ProductItems as projection on db.ProductItem;
    entity Orders as projection on db.Order;
    entity Users as projection on db.User;
}

// Add restriction rules
annotate CatalogService.Orders with @(restrict: [
    { grant: ['READ', 'UPDATE'], where: 'createdBy = $user.id'},
    { grant: 'CREATE'}
]);
annotate CatalogService.Users with @(restrict: [
    { grant: ['READ', 'UPDATE'], where: 'ID = $user.id'}
]);
 
 