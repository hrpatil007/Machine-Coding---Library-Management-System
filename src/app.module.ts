import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/library_management'),
    UserModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
