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

@Controller('orders')
@UseGuards(AuthGuard('jwt'))
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async getAllOrders() {
    return this.orderService.getAllOrders();
  }

  @Get(':id')
  async getOrderById(@Param('id') id: string) {
    return this.orderService.getOrderById(parseInt(id, 10));
  }

  @Post()
  async createOrder(@Body() orderData: any) {
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
    return this.orderService.createOrder(orderData);
  }

  @Put(':id')
  async updateOrder(@Param('id') id: string, @Body() orderData: any) {
    if (!orderData.userId && !orderData.orderLines) {
      throw new HttpException(
        'UserId or OrderLines are required',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.orderService.updateOrder(parseInt(id, 10), orderData);
  }

  @Delete(':id')
  async deleteOrder(@Param('id') id: string) {
    return this.orderService.deleteOrder(parseInt(id, 10));
  }
}
