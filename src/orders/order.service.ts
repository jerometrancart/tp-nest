import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma, Prisma } from '../utils/database';

@Injectable()
export class OrderService {
  async getAllOrders(): Promise<Order[]> {
    return prisma.order.findMany();
  }

  async getOrderById(id: number): Promise<Order> {
    const order = await prisma.order.findUnique({
      where: { id },
      include: { orderLines: { include: { product: true } } },
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  async createOrder(orderData: Prisma.OrderCreateInput): Promise<Order> {
    return prisma.order.create({
      data: orderData,
    });
  }

  async updateOrder(
    id: number,
    orderData: Prisma.OrderUpdateInput,
  ): Promise<Order> {
    const order = await prisma.order.findUnique({
      where: { id },
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return prisma.order.update({
      where: { id },
      data: orderData,
    });
  }

  async deleteOrder(id: number): Promise<Order> {
    const order = await prisma.order.findUnique({
      where: { id },
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return prisma.order.delete({
      where: { id },
    });
  }
}
