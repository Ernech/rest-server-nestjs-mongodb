import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
export const uploadFile =(file:Express.Multer.File, validExtensions:string[]=['jpg','png','jpeg','gif'], folder:string='')=>{

    return new Promise((resolve,reject)=>{
        const { originalname } = file;
        const splitedName:string[] = originalname.split('.');
        const extension:string = splitedName[splitedName.length-1];
        if(!validExtensions.includes(extension)){
            return reject(`The extension ${extension} is not valid ${validExtensions}`);
        }
        const tempName:string = uuidv4() + "." +extension
        const basePath = process.env.NODE_ENV ==='production'?'dist':'src';
        const uploadPath = path.join(__dirname,`../../${basePath}/files`,folder,'/',tempName);
        fs.writeFile(uploadPath,file.buffer,(error)=>{
            if(error){
                console.log(error);
                return reject("There was an error when moving file");
            }
            resolve(tempName);
        })
        
    })

}