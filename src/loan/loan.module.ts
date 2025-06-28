import { Module } from '@nestjs/common';
import { LoanService } from './loan.service';
import { LoanController } from './loan.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Loan, LoanSchema } from './entities/loan.entity';
import { UserModule } from 'src/users/user.module';
import { BookModule } from 'src/books/book.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Loan.name, schema: LoanSchema }]),
    UserModule,
    BookModule,
  ],
  controllers: [LoanController],
  providers: [LoanService],
})
export class LoanModule {}
