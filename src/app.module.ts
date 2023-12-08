import { Module } from '@nestjs/common';
import { ProductModule } from './products/product.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { OrderModule } from './orders/order.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [ProductModule, OrderModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
