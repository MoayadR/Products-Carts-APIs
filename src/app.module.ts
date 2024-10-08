import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { Product } from './product/entities/product.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CartModule } from './cart/cart.module';
import { Cart } from './cart/entities/cart.entity';
import { CartProduct } from './cart/entities/cart-product';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'sqlite',
      database:`${__dirname}/../database/products_carts.db`,
      entities:[Product, Cart , CartProduct],
      synchronize:true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // Serve the 'uploads' folder statically
      serveRoot: '/v1/uploads', // Images will be accessible at '/uploads/filename'
    }),
    ProductModule,
    CartModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
