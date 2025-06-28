import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/user.module';
import { BookModule } from './books/book.module';
import { LoanModule } from './loan/loan.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/library_management'),
    UserModule,
    BookModule,
    LoanModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
