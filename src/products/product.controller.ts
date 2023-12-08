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
import { ProductService } from './product.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('products')
@UseGuards(AuthGuard('jwt'))
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Get(':id')
  async getProductById(@Param('id') id: string) {
    return this.productService.getProductById(parseInt(id, 10));
  }

  @Post()
  async createProduct(@Body() productData: any) {
    if (!productData.name || !productData.price) {
      throw new HttpException(
        'Name and price are required',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.productService.createProduct(productData);
  }

  @Put(':id')
  async updateProduct(@Param('id') id: string, @Body() productData: any) {
    if (!productData.name && !productData.price) {
      throw new HttpException(
        'Name or price is required',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.productService.updateProduct(parseInt(id, 10), productData);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(parseInt(id, 10));
  }
}
