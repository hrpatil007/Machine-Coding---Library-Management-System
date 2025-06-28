import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { LoanService } from './loan.service';
import { BorrowDto } from './dtos/create.loan.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import { Loan } from './entities/loan.entity';

@ApiTags('Loans')
@Controller('loans')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @Post('borrow')
  @ApiOperation({ summary: 'Borrow a book' })
  @ApiBody({ type: BorrowDto })
  @ApiResponse({
    status: 201,
    description: 'Book borrowed successfully',
    type: Loan,
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error or borrowing limit reached',
  })
  borrow(@Body() dto: BorrowDto) {
    return this.loanService.borrow(dto);
  }

  @Post('return')
  @ApiOperation({ summary: 'Return a borrowed book' })
  @ApiBody({ type: BorrowDto })
  @ApiResponse({
    status: 200,
    description: 'Book returned successfully',
    type: Loan,
  })
  @ApiResponse({
    status: 400,
    description: 'Return failed — book not borrowed or invalid user/book ID',
  })
  return(@Body() dto: BorrowDto) {
    return this.loanService.return(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all active (non-returned) loans' })
  @ApiResponse({
    status: 200,
    description: 'List of active loans',
    type: [Loan],
  })
  active() {
    return this.loanService.listActive();
  }

  @Get('history')
  @ApiOperation({ summary: 'Get loan history for a specific user' })
  @ApiQuery({
    name: 'userId',
    description: 'User ID to filter loan history',
    required: true,
    example: '9d5a732c-65ef-49a4-82df-1b1c9f176c49',
  })
  @ApiResponse({
    status: 200,
    description: 'List of past loans by the user',
    type: [Loan],
  })
  history(@Query('userId') userId: string) {
    return this.loanService.userHistory(userId);
  }
}
