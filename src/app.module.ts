import { Module } from '@nestjs/common';
import { ProductModule } from './products/product.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  imports: [ProductModule],
  controllers: [AppController],
  providers: [AppService, ],
})
export class AppModule {}
