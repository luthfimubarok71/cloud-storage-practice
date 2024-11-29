const { Storage } = require("@google-cloud/storage");

const storage = new Storage();
const bucketName = 'latihan-mlgc-storage';
const fileName = 'dicoding-header-logo.png';

async function download() {
  const options= {
    destination: './image/dicoding-download.png'
  };

  await storage.bucket(bucketName).file(fileName).download(options);
  console.log("Objek berhasil di download");
}

download().catch(console.error);