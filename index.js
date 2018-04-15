import axios from "axios";
import fileType from "react-native-file-type";

const API_END_POINT = "https://api.cloudinary.com/v1_1/";

const CLOUD_NAME = null;
const UPLOAD_PROFILE_NAME = null;

class RNCloudinaryUnsigned {
  init = (a, b) => {
    return new Promise((resolve, reject) => {
      if (a && b) {
        CLOUD_NAME = a;
        UPLOAD_PROFILE_NAME = b;
        console.log("ok");
        resolve({
          error: false,
          credentials: {
            CLOUD_NAME,
            UPLOAD_PROFILE_NAME
          }
        });
      } else {
        reject(
          "Credentials must not be empty. Please check your configuration."
        );
      }
    });
  };
  upload = (file, filename = null) => {
    return new Promise((resolve, reject) => {
      if (CLOUD_NAME && UPLOAD_PROFILE_NAME) {
        if (file) {
          fileType(file).then(type => {
            const url = `${API_END_POINT}${CLOUD_NAME}/image/upload`;
            const fd = new FormData();
            const name = filename
              ? `${filename}.${type.ext}`
              : `upload.${type.ext}`;
            fd.append("upload_preset", UPLOAD_PROFILE_NAME);
            fd.append("file", {
              name,
              uri: file,
              type: type.mime
            });
            const config = {
              headers: {
                "Content-Type": "multipart/form-data"
              }
            };
            axios
              .post(url, fd, config)
              .then(res => {
                resolve(res);
              })
              .catch(err => {
                reject(err);
              });
          });
        } else {
          reject("You must send a file path to the function.");
        }
      } else {
        reject(
          "Credentials must not be empty. Please check your configuration."
        );
      }
    });
  };
  delete = token => {
    if (CLOUD_NAME && UPLOAD_PROFILE_NAME) {
      if (token) {
        return new Promise((resolve, reject) => {
          const url = `${API_END_POINT}${CLOUD_NAME}/delete_by_token`;
          axios
            .post(url, { token })
            .then(res => {
              resolve(res);
            })
            .catch(err => {
              reject(err);
            });
        });
      } else {
        reject("You must send a token to the function.");
      }
    }
  };
}

module.exports = new RNCloudinaryUnsigned();
