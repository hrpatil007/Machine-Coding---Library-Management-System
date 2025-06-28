import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BookService } from 'src/books/book.service';
import { UserService } from 'src/users/user.service';
import { BorrowDto } from './dtos/create.loan.dto';
import { Loan } from './entities/loan.entity';
import { Model } from 'mongoose';

@Injectable()
export class LoanService {
  constructor(
    @InjectModel(Loan.name) private loanModel: Model<Loan>,
    private userService: UserService,
    private bookService: BookService,
  ) {}

  async borrow(dto: BorrowDto): Promise<Loan> {
    const book = await this.bookService.findById(dto.bookId);
    if (!book || book.availableCopies <= 0)
      throw new BadRequestException('No available copies');

    const loans = await this.loanModel.countDocuments({
      userId: dto.userId,
      returnDate: null,
    });
    if (loans >= 5)
      throw new BadRequestException('User has reached the max borrow limit');

    await this.bookService.decrementAvailableCopies(dto.bookId);
    return new this.loanModel(dto).save();
  }

  async return(dto: BorrowDto): Promise<Loan> {
    const loan = await this.loanModel.findOne({
      userId: dto.userId,
      bookId: dto.bookId,
      returnDate: null,
    });
    if (!loan) throw new BadRequestException('No active loan found');

    loan.returnDate = new Date();
    await loan.save();
    await this.bookService.incrementAvailableCopies(dto.bookId);
    return loan;
  }

  async listActive(): Promise<Loan[]> {
    return this.loanModel.find({ returnDate: null });
  }

  async userHistory(userId: string): Promise<Loan[]> {
    return this.loanModel.find({ userId });
  }
}
