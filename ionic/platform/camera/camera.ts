import * as util from 'ionic/util';

import {NativePlugin} from '../plugin';

/**
 * Take a photo or capture video.
 *
 * Requires Cordova plugin: `cordova-plugin-camera`. For more info, please see the [Cordova Camera Plugin Docs](https://github.com/apache/cordova-plugin-camera).
 *
 * @usage
 * ```js
 * Camera.getPicture(options).then((imageData) => {
 *  // imageData is either a base64 encoded string or a file URI
 *  // If it's base64:
 *  let base64Image = "data:image/jpeg;base64," + imageData;
 * }, (err) => {
 * });
 * ```
 */
@NativePlugin({
  name: 'Camera',
  platforms: ['ios', 'android'],
  engines: {
    cordova: 'cordova-plugin-camera'
  },
  pluginCheck: () => {
    return !!navigator.camera;
  }
})
export class Camera {

  /**
   * @enum {number}
   */
  static DestinationType = {
    /** Return base64 encoded string */
    DATA_URL: 0,
    /** Return file uri (content://media/external/images/media/2 for Android) */
    FILE_URI: 1,
    /** Return native uri (eg. asset-library://... for iOS) */
    NATIVE_URI: 2
  }

  /**
   * @enum {number}
   */
  static EncodingType = {
    /** Return JPEG encoded image */
    JPEG: 0,
    /** Return PNG encoded image */
    PNG: 1
  }

  /**
   * @enum {number}
   */
  static MediaType = {
    /** Allow selection of still pictures only. DEFAULT. Will return format specified via DestinationType */
    PICTURE: 0,
    /** Allow selection of video only, ONLY RETURNS URL */
    VIDEO: 1,
    /** Allow selection from all media types */
    ALLMEDIA : 2
  }

  /**
   * @enum {number}
   */
  static PictureSourceType = {
    /** Choose image from picture library (same as SAVEDPHOTOALBUM for Android) */
    PHOTOLIBRARY : 0,
    /** Take picture from camera */
    CAMERA : 1,
    /** Choose image from picture library (same as PHOTOLIBRARY for Android) */
    SAVEDPHOTOALBUM : 2
  }

  /**
   * Matches iOS UIPopoverArrowDirection constants to specify arrow location on popover.
   * @enum {number}
   */
  static PopoverArrowDirection = {
      ARROW_UP : 1,
      ARROW_DOWN : 2,
      ARROW_LEFT : 4,
      ARROW_RIGHT : 8,
      ARROW_ANY : 15
  }

  /**
   * @enum {number}
   */
  static Direction = {
      /** Use the back-facing camera */
      BACK: 0,
      /** Use the front-facing camera */
      FRONT: 1
  }

  /**
   * Let the user take a photo or capture video.
   *
   * @param options {object} options for the photo. Of the form (with defaults):
   * {
   *  quality: 80,
   *  destinationType: window.Camera.DestinationType.DATA_URL,
   *  sourceType: window.Camera.PictureSourceType.CAMERA (VIDEO or ALLMEDIA for both),
   *  allowEdit: true,
   *  encodingType: window.Camera.EncodingType.JPEG,
   *  popoverOptions: window.CameraPopoverOptions,
   *  saveToPhotoAlbum: false
   * }
   * @return {Promise} resolving with data or rejecting on error
   */
  static getPicture(options) {
    return new Promise((resolve, reject) => {
      if (!navigator.camera) {
        this.pluginWarn();
        resolve(null);
        return;
      }

      var options = util.defaults({
        quality: 80,
        destinationType: window.Camera.DestinationType.DATA_URL,
        sourceType: window.Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: window.Camera.EncodingType.JPEG,
        popoverOptions: window.CameraPopoverOptions,
        saveToPhotoAlbum: false
      }, options);

      navigator.camera.getPicture(function (imageData) {
        resolve(imageData);
      }, function (err) {
        reject(err);
      }, options);
    });
  }

  /**
   * If using FILE_URI and taking photos, photos will be stored temporarily. To
   * remove them, call cleanup when the camera session is finished.
   * @return {Promise}
   */
  static cleanup() {
    return new Promise((resolve, reject) => {
      navigator.camera.cleanup(function () {
        resolve();
      }, function (err) {
        reject(err);
      });
    });
  }
}
