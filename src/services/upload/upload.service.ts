import { BadRequestException, Injectable, UploadedFile } from '@nestjs/common';
import { uploadFile } from 'src/helpers/uploadFile';

@Injectable()
export class UploadService {

    async uploadNewFile(@UploadedFile() file:Express.Multer.File){
        try {
            const fileName = await uploadFile(file,undefined,'img');
            return{file:fileName}
        } catch (error) {
            console.log(error);
            throw new BadRequestException("There was an error moving the file");
        }
        
    }
}
