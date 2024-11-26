using { cuid, managed} from '@sap/cds/common';

namespace online.store;

entity Category: cuid {
    name: String(80);
    image: String(120);
    subcategories: Composition of many SubCategory on subcategories.parent = $self;
}

entity SubCategory: cuid {
    name: String(40);
    parent: Association to Category;
}