import { Request, Response } from "express";

const ImageKit = require("imagekit");

const imageKit = new ImageKit({
  publicKey: `${process.env.CLOUD_IMAGE_UPLOAD_API_KEY}`,
  privateKey: `${process.env.CLOUD_IMAGE_UPLOAD_API_SECRET}`,
  urlEndpoint: `${process.env.CLOUD_IMAGE_UPLOAD_URL_ENDPOINT}`,
});

const uploadController = {
  uploadImage: (req: Request, res: Response) => {
    try {
      const file: any = (<any>req).files.file;
      imageKit.upload(
        {
          file: file.data, //required
          fileName: file.name, //required
          folder: "/memories/",
        },
        function (error: any, result: any) {
          if (error) {
            console.log(error);
            throw error;
          }
          res.status(200).json({ msg: "Uploaded successfully.", result });
        }
      );
    } catch (err) {
      console.log(err);
      return res.status(400).json({ msg: "Something went wrong." });
    }
  },
  deleteImage: (req: Request, res: Response) => {
    try {
      const { fileId } = (<any>req).body;

      imageKit.deleteFile(fileId, function (error: any, result: any) {
        if (error) console.log(error);

        res.status(204).json({ msg: "Deleted successfully.", result });
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ msg: "Something went wrong." });
    }
  },
};

module.exports = uploadController;
