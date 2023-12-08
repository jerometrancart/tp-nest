import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
  private products = [];

  getAllProducts() {
    return this.products;
  }

  getProductById(id: number) {
    return this.products.find((product) => product.id === id);
  }

  createProduct(productData: any) {
    const newProduct = { id: this.products.length + 1, ...productData };
    this.products.push(newProduct);
    return newProduct;
  }

  updateProduct(id: number, productData: any) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...productData };
      return this.products[index];
    }
    return null;
  }

  deleteProduct(id: number) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index !== -1) {
      const deletedProduct = this.products[index];
      this.products.splice(index, 1);
      return deletedProduct;
    }
    return null;
  }
}
