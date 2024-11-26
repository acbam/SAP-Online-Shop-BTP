using {online.store as db} from '../db/schema';

service CatalogService {
    entity Categories as projection on db.Category;
    entity SubCategories as projection on db.SubCategory;
}