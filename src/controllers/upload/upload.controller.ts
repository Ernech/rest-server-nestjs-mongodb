import { Controller, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
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

    @Post("/:collection/:id")
    @Authorization(false)
    @UseInterceptors(FileInterceptor('file'))
    async updateFile(@UploadedFile() file:Express.Multer.File, @Param("collection") collection:string, @Param("id") id:string){
        return await this.uploadService.updateImage(file,collection,id);
    }
    

}
