import { Injectable, UploadedFile } from '@nestjs/common';

@Injectable()
export class UploadService {

    async uploadNewFile(@UploadedFile() file:Express.Multer.File){
        console.log(file);
        return "File uploaded"
    }
}
