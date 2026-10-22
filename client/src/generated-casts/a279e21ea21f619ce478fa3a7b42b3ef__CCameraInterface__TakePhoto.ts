// a279e21ea21f619ce478fa3a7b42b3ef.cct / CCameraInterface / TakePhoto

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function TakePhoto(_me: LingoMe, a_rect: LingoValue) {
  callMethod("setLastPhotoRect", callMethod("getComponent", _me), a_rect)
  callNamed("hideWindows")
  var tImg = callNamed("image", lingoBinary("sub", a_rect.right, a_rect.left), lingoBinary("sub", a_rect.bottom, a_rect.top), 32);
  callMethod("hideCamera", _me)
  callNamed("updateStage")
  callMethod("copyPixels", tImg, theProperty("stage").image, tImg.rect, a_rect)
  tImg = callMethod("processImage", callMethod("getComponent", _me), tImg);
  var tThumb = callMethod("createThumb", callMethod("getComponent", _me), tImg);
  callMethod("RegisterImage", callMethod("getComponent", _me), tImg, tThumb)
  callNamed("showWindows")
  callMethod("hideCamera", _me)
}

