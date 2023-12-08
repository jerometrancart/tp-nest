import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProductService } from './product.service';

@Controller('products')
@UseGuards(AuthGuard('jwt'))
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Get(':id')
  getProductById(@Param('id') id: string) {
    return this.productService.getProductById(parseInt(id, 10));
  }

  @Post()
  createProduct(@Body() productData: any) {
    return this.productService.createProduct(productData);
  }

  @Put(':id')
  updateProduct(@Param('id') id: string, @Body() productData: any) {
    return this.productService.updateProduct(parseInt(id, 10), productData);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(parseInt(id, 10));
  }
}
