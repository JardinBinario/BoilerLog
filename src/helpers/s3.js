const S3 = require ('aws-sdk/clients/s3');
const fs = require('fs');
const {config} = require('../config');

const s3service = new S3({
    region: config.awsRegion,
    accessKeyId: config.awsAccessKey,
    secretAccessKey: config.awsSecretKey,
});

const uploadFile = (filePath, fileName, id, mimeType) => {
    const fileStream = fs.readFileSync(filePath);
    const uploadParams = {
        Bucket: config.awsBucket,
        Body: fileStream,
        Key: `${id}/${fileName}`,
        ContentType: mimeType
    };
    return s3service.upload(uploadParams).promise();
};

const getFile = (id, fileName) => 
    s3service.getObject({
        Bucket: config.awsBucket,
        Key: `${id}/${fileName}`
    }).createReadStream();

const deleteFile = (id, fileName) => 
    s3service.deleteObject({
        Bucket: config.awsBucket,
        Key: `${id}/${fileName}`
    }).promise();

module.exports = {
    uploadFile,
    getFile,
    deleteFile
};