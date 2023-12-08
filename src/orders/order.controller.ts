import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from '../../prisma/src/prisma/client';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  getAllOrders(): Promise<Order[]> {
    return this.orderService.getAllOrders();
  }

  @Get(':id')
  getOrderById(@Param('id') id: string): Promise<Order> {
    return this.orderService.getOrderById(+id);
  }

  @Post()
  createOrder(@Body() orderData: any): Promise<Order> {
    return this.orderService.createOrder(orderData);
  }

  @Put(':id')
  updateOrder(@Param('id') id: string, @Body() orderData: any): Promise<Order> {
    return this.orderService.updateOrder(+id, orderData);
  }

  @Delete(':id')
  deleteOrder(@Param('id') id: string): Promise<Order> {
    return this.orderService.deleteOrder(+id);
  }
}
