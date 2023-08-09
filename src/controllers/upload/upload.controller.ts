import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Authorization } from 'src/decorators/auth.decorator';
import { UploadService } from 'src/services/upload/upload.service';

@Controller('upload')
export class UploadController {

    constructor(private uploadService:UploadService){}

    @Post()
    @Authorization(false)
    @UseInterceptors(FileInterceptor('file'))
    async uploadNewFile(@UploadedFile() file:Express.Multer.File){
        return await this.uploadService.uploadNewFile(file);
    }

}
