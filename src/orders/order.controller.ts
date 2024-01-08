import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthGuard } from '@nestjs/passport';
import { prisma, Order, OrderLine, Product } from '../utils/database';

interface OrderCreateInput {
  userId: number;
  orderLines: OrderLineInput[];
}

interface OrderUpdateInput {
  userId?: number;
  orderLines?: OrderLineInput[];
}

interface OrderLineInput {
  productId: number;
  quantity: number;
  price: number;
  product?: Product; // Si vous avez besoin d'informations sur le produit lors de la création/mise à jour
}

@Controller('orders')
@UseGuards(AuthGuard('jwt'))
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async getAllOrders() {
    const orders = await prisma.order.findMany();
    return orders;
  }

  @Get(':id')
  async getOrderById(@Param('id') id: string) {
    const orderId = parseInt(id, 10);
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { orderLines: { include: { product: true } } }, // Si vous avez besoin des informations sur le produit
    });
    if (!order) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }
    return order;
  }

  @Post()
  async createOrder(@Body() orderData: OrderCreateInput) {
    if (
      !orderData.userId ||
      !orderData.orderLines ||
      orderData.orderLines.length === 0
    ) {
      throw new HttpException(
        'UserId and at least one OrderLine are required',
        HttpStatus.BAD_REQUEST,
      );
    }
    const createdOrder = await prisma.order.create({
      data: {
        userId: orderData.userId,
        orderLines: { create: orderData.orderLines },
      },
      include: { orderLines: { include: { product: true } } }, // Si vous avez besoin des informations sur le produit
    });
    return createdOrder;
  }

  @Put(':id')
  async updateOrder(
    @Param('id') id: string,
    @Body() orderData: OrderUpdateInput,
  ) {
    const orderId = parseInt(id, 10);
    if (!orderData.userId && !orderData.orderLines) {
      throw new HttpException(
        'UserId or OrderLines are required',
        HttpStatus.BAD_REQUEST,
      );
    }
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        userId: orderData.userId,
        orderLines: { create: orderData.orderLines },
      },
      include: { orderLines: { include: { product: true } } }, // Si vous avez besoin des informations sur le produit
    });
    return updatedOrder;
  }

  @Delete(':id')
  async deleteOrder(@Param('id') id: string) {
    const orderId = parseInt(id, 10);
    const deletedOrder = await prisma.order.delete({
      where: { id: orderId },
    });
    if (!deletedOrder) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }
    return deletedOrder;
  }
}
