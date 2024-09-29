let product: [string, number, boolean] = ["Laptop", 1500, true];

export default function showProductInfo(product: [string, number, boolean]): void {
    console.log(`Product: ${product[0]}, Price: $${product[1]}, In Stock: ${product[2]}`)
}

showProductInfo(product)