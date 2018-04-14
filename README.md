# react-native-cloudinary-unsigned

![Cloudinary Logo](https://res.cloudinary.com/cloudinary/image/upload/b_rgb:ffffff,c_scale,w_500/v1/logo/for_white_bg/cloudinary_logo_for_white_bg.png)

This module helps you to send files to [Cloudinary](https://cloudinary.com) through an [upload profile](https://cloudinary.com/console/settings/upload).

## Getting started

`$ npm install react-native-cloudinary-unsigned --save`

### Mostly automatic installation

`$ react-native link react-native-cloudinary-unsigned`

### Manual installation

#### iOS

1.  In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2.  Go to `node_modules` ➜ `react-native-cloudinary-unsigned` and add `RNCloudinaryUnsigned.xcodeproj`
3.  In XCode, in the project navigator, select your project. Add `libRNCloudinaryUnsigned.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4.  Run your project (`Cmd+R`)<

#### Android

1.  Open up `android/app/src/main/java/[...]/MainActivity.java`

* Add `import com.reactlibrary.RNCloudinaryUnsignedPackage;` to the imports at the top of the file
* Add `new RNCloudinaryUnsignedPackage()` to the list returned by the `getPackages()` method

2.  Append the following lines to `android/settings.gradle`:
    ```
    include ':react-native-cloudinary-unsigned'
    project(':react-native-cloudinary-unsigned').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-cloudinary-unsigned/android')
    ```
3.  Insert the following lines inside the dependencies block in `android/app/build.gradle`:
    ```
      compile project(':react-native-cloudinary-unsigned')
    ```

## Usage

```javascript
// Import library into your project
import RNCloudinaryUnsigned from "react-native-cloudinary-unsigned";

// Declare your credentials
const CLOUDINARY_CLOUD_NAME = "xxxxxx";
const CLOUDINARY_UPLOAD_PROFILE_NAME = "xxxxxx";
RNCloudinaryUnsigned.init(CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PROFILE_NAME)
  .then(res => console.log(res))
  .catch(err => console.error(err));

// Call function to upload or remove image
export default class App extends Component {
  // Upload an image
  uploadImage = file => {
    RNCloudinaryUnsigned.upload(file)
      .then(res => console.log(res))
      .catch(err => console.error(err));
  };
  // Delete an image
  deleteImage = token => {
    RNCloudinaryUnsigned.delete(token)
      .then(res => console.log(res))
      .catch(err => console.error(err));
  };
}
```

## How safe / secure is it to use unsigned upload from mobile clients?

The only "risk" in using unsigned uploads with Cloudinary is the possibility that another person will view the source code of your uploader, replicate the configuration and issue uploads from another place onto your account.

However, the following is worth mentioning:

* This will "only" allow them to initiate unsigned-uploads to your account (may result with a certain Storage/Transformations quotas abuse).
* This will NOT allow anyone to Delete / Edit / Overwrite any of your existing content on the account. A list of supported unsigned-upload options is available here.
* As a safety measure, from time to time, you may want to change your upload-preset's name (can be done via the account settings) to reduce the possibility of someone using your configuration without your permission.
* Finally we must say that until the writing of these lines we haven't heard of anyone of our customers experiencing this kind of offense.
