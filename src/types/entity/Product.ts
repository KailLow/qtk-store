import BaseEntity from "./BaseEntity";

interface Categories {
    name: string;
    [x: string]: any;
}

interface Supplier {
    name: string;
    [x: string]: any;
}

interface Quantity {
    imported: number;
    inStock: number;
    sold: number;
}

export default interface Product extends BaseEntity {
    [x: string]: any;
    name: string;
    description: string;
    unit: string;
    images: string;
    price: number;
    category: string;
    categoryId: string;
    supplier: string;
    supplierId: string;
    quantityImported: number;
    quantityInStock: number;
    quantitySold: number;
}

export function createProduct(
    name: string,
    id: string,
    description: string,
    unit: string,
    images: string = '',
    price: number = 0,
    categories: Categories,
    suppliers: Supplier,
    quantities: Quantity,
  ): Product {
    const category = categories[0].name;
    const categoryId = categories[0].id;
    const supplier = suppliers.name;
    const supplierId = suppliers.id;
    const quantityImported = quantities.imported;
    const quantityInStock = quantities.inStock;
    const quantitySold = quantities.sold;
    const product: Product = {
        name,
        id,
        description,
        unit,
        images,
        price,
        category,
        categoryId,
        supplier,
        supplierId,
        quantityImported,
        quantityInStock,
        quantitySold
    };
    return product;
}