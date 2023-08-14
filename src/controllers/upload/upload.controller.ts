import { Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Authorization } from 'src/decorators/auth.decorator';
import { UploadService } from 'src/services/upload/upload.service';
import { Response } from 'express';
@Controller('upload')
export class UploadController {

    constructor(private uploadService:UploadService){}

    @Post()
    @Authorization(false)
    @UseInterceptors(FileInterceptor('file'))
    async uploadNewFile(@UploadedFile() file:Express.Multer.File){
        return await this.uploadService.uploadNewFile(file);
    }

    @Get("/:collection/:id")
    @Authorization(false)
    async getFile(@Param("collection") collection:string, @Param("id") id:string, @Res() res:Response){
        return await this.uploadService.getImage(collection,id,res);
    }

    @Post("/:collection/:id")
    @Authorization(false)
    @UseInterceptors(FileInterceptor('file'))
    async updateFile(@UploadedFile() file:Express.Multer.File, @Param("collection") collection:string, @Param("id") id:string){
        return await this.uploadService.updateImage(file,collection,id);
    }
    

}
