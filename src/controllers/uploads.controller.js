import fs from 'fs'

import dotenv from 'dotenv'
dotenv.config({path : 'variables.env'})


//IMPORTS DE AWS 
import aws from 'aws-sdk';

export const uploadProfile = async (req, res) => {
    if(process.env.NODE_ENV !== 'production'){
        console.log('Esta en desarrollo');
        
        fs.renameSync(req.file.path, `${req.file.destination}/${req.file.filename}.${req.file.mimetype.split('/')[1]}`);
        const url = `${process.env.DEV_HOST}:${process.env.DEV_PORT}/public/img/profile/${req.file.filename}.${req.file.mimetype.split('/')[1]}`;
        console.log(url);
        console.log(req.file)
        res.status(200).json({url});
    }else{
        fs.renameSync(req.file.path, `${req.file.destination}/${req.file.filename}.${req.file.mimetype.split('/')[1]}`);
        const url = `${process.env.PROD_HOST}:${process.env.PROD_PORT}/public/img/profile/${req.file.filename}.${req.file.mimetype.split('/')[1]}`;
        console.log(url);
        console.log(req.file)
        res.status(200).json({url});
    }
}

export const signS3 = async (req, res) =>{
    const {fileName, fileType} = req.body;
    const s3 = new aws.S3({
        signatureVersion: 'v4',
        region: 'us-east-1',
        accessKeyId : process.env.ACCESS_KEY_ID,
        secretAccessKey : process.env.SECRET_ACCESS_KEY
      });

      const s3Params = {
        Bucket: process.env.S3_BUCKET,
        Key: fileName,
        Expires: 60,
        ContentType: fileType,
      //   ACL: 'public-read',
      };

      const signedRequest = await s3.getSignedUrl('putObject', s3Params);
      console.log(signedRequest);
      const url = `https://${process.env.S3_BUCKET}.s3.amazonaws.com/${fileName}`;
      console.log(url);
      res.status(200).json({
        signedRequest,
        url,
      })
}