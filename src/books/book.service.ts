import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateBookDto } from './dtos/book.dto';
import { UpdateBookDto } from './dtos/books.update.dto';
import { Book, BookDocument } from './entities/books.entity';
import { Model } from 'mongoose';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  async create(dto: CreateBookDto): Promise<Book> {
    const book = new this.bookModel({
      ...dto,
      availableCopies: dto.totalCopies,
    });
    return book.save();
  }

  async findAll(): Promise<Book[]> {
    return this.bookModel.find();
  }

  async findById(id: string): Promise<Book | null> {
    return this.bookModel.findById(id);
  }

  async update(id: string, dto: UpdateBookDto): Promise<Book | null> {
    return this.bookModel.findByIdAndUpdate(id, dto, { new: true });
  }

  async delete(id: string): Promise<void> {
    await this.bookModel.findByIdAndDelete(id);
  }

  async decrementAvailableCopies(bookId: string): Promise<void> {
    await this.bookModel.updateOne(
      { _id: bookId, availableCopies: { $gt: 0 } },
      { $inc: { availableCopies: -1 } },
    );
  }

  async incrementAvailableCopies(bookId: string): Promise<void> {
    await this.bookModel.updateOne(
      { _id: bookId },
      { $inc: { availableCopies: 1 } },
    );
  }
}
