// 0e4feeca6184e908b7fbd03d6d41b7b8.cct / Binary Manager Class / registerCmds

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function registerCmds(_me: LingoMe, tBool: LingoValue) {
  var tList = new LingoPropList([]);
  tList["THUMBNAIL_RECEIVED"] = symbol("thumbnailDataStored");
  tList["PICTURE_SAVED"] = symbol("binaryDataStored");
  tList["BINDATA_AUTHKEYERROR"] = symbol("binaryDataAuthKeyError");
  tList["DISCONNECT"] = symbol("disconnect");
  tList["HELLO"] = symbol("foo");
  tList["OK"] = symbol("foo");
  tList["THUMBNAIL_INFO"] = symbol("thumbnailInfo");
  tList["THUMBNAIL"] = symbol("thumbnailData");
  tList["CATALOG_PHOTO_INFO"] = symbol("catalogPhotoInfo");
  tList["CATALOG_PHOTO"] = symbol("catalogPhotoData");
  tList["ALBUM_PHOTO_INFO"] = symbol("albumPhotoInfo");
  tList["ALBUM_PHOTO"] = symbol("albumPhotoData");
  tList["WALL_PHOTO_INFO"] = symbol("wallPhotoInfo");
  tList["WALL_PHOTO"] = symbol("wallPhotoData");
  tList["PICTURE_CAPTION_RECEIVED"] = symbol("captionReceived");
  tList["ALBUM_EMPTY"] = symbol("albumEmpty");
  if (tBool) {
  return callMethod("registerListener", callNamed("getMultiuserManager"), meProp(_me, "pConnectionId"), callMethod("getID", _me), tList);
  } else {
  return callMethod("unregisterListener", callNamed("getMultiuserManager"), meProp(_me, "pConnectionId"), callMethod("getID", _me), tList);
  }

}

