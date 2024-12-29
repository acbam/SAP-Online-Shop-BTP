using { cuid, managed} from '@sap/cds/common';

namespace online.store;

entity Category: cuid {
    name: String(80);
    image: String(120);
    subcategories: Composition of many SubCategory on subcategories.parent = $self;
}

entity SubCategory: cuid {
    name: String(40);
    image: String(120);
    products: Composition of many Product on products.subcategory = $self;
    parent: Association to Category;
}

entity Product: cuid {
    category: UUID;
    subcategory: Association to SubCategory;
    sku: String(80);
    name: String(80);
    description: String;
    image: String(120);
    price: Decimal;
    discount: Decimal;
    stock: Integer;
    rating: Decimal;
}

entity User: cuid {
    username: String;
    password: String;
}
entity UserSession: cuid {
    login: String;
    ipAddress: String;
    createdAt : DateTime default $now;
}

entity ProductItem: cuid {
    product : Association to Product;
    quantity: Integer;
    order: Association to Order;
}

entity Order: cuid, managed {
    products: Composition of many ProductItem on products.order = $self;
}