import { Injectable, NotFoundException } from '@nestjs/common';
import prisma from '../utils/database';
import { Prisma, Product } from '../../prisma/src/prisma/client';

@Injectable()
export class ProductService {
  async getAllProducts(): Promise<Product[]> {
    return prisma.product.findMany();
  }

  async getProductById(id: number): Promise<Product> {
    const product = await prisma.product.findUnique({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async createProduct(
    productData: Prisma.ProductCreateInput,
  ): Promise<Product> {
    return prisma.product.create({
      data: productData,
    });
  }

  async updateProduct(
    id: number,
    productData: Prisma.ProductUpdateInput,
  ): Promise<Product> {
    const product = await prisma.product.findUnique({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return prisma.product.update({
      where: { id },
      data: productData,
    });
  }

  async deleteProduct(id: number): Promise<Product> {
    const product = await prisma.product.findUnique({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return prisma.product.delete({
      where: { id },
    });
  }
}
