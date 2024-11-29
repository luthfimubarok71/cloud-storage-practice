const {Storage} = require("@google-cloud/storage");

// membuat client
const storage = new Storage();
// membuat nama bucket
const bucketName = 'latihan-mlgc-storage';
const filePath = './image/dicoding-header-logo.png';

// fungsi untuk membuat bucket jika bucket tidak ditemukan
async function getOrCreateBucket(bucketName) {
  const bucket = storage.bucket(bucketName);

  try {
    // mendapatkan informasi bucket jika ada.
    const [metadata] = await bucket.getMetadata();
    console.log(`Bucket ${metadata.name} sudah ada.`);
    return bucket;
  } catch (error) {
    const optionsCreateBucket = {
      location: 'ASIA-SOUTHEAST2',
    };
    // create bucket
    await storage.createBucket(bucketName, optionsCreateBucket);
    console.log(`${bucketName} bucket berhasil dibuat.`);
    return bucket;
  }
}

// fungsi upload single object
async function upload(bucket) {
  try {
    const customMetadata = {
      contentType: 'image/jpeg',
      metadata: {
        type: 'header-logo'
      }
    };

    const optionsUploadObject = {
      destination: 'dicoding-header-logo.png',
      preconditionOpts: {ifGenerationMatch:0},
      metadata: customMetadata
    };

    await storage.bucket(bucketName).upload(filePath, optionsUploadObject);
    console.log(`${filePath} berhasil di upload ke ${bucketName} bucket.`);
  } catch (uploadError) {
      console.log(`Gagal mengupload ${filePath}:`, uploadError.message);
  }
}

// cath error
getOrCreateBucket(bucketName).then((bucket) => upload(bucket)).catch(console.error);