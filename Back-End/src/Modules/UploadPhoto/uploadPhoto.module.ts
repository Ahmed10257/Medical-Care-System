// upload.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UploadController } from './uploadPhotot.controller';
import { UploadService } from './uploadPhoto.service';
import { v2 as cloudinary } from 'cloudinary';
import { configureCloudinary } from 'src/cloudinary.config';

@Module({
  imports: [ConfigModule],
  controllers: [UploadController],
  providers: [
    UploadService,
    {
      provide: 'CLOUDINARY',
      useFactory: (configService: ConfigService) => {
        configureCloudinary(configService);
        return cloudinary;
      },
      inject: [ConfigService],
    },
  ],
})
export class UploadModule {}
