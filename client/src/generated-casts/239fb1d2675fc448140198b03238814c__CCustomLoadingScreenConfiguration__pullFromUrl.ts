// 239fb1d2675fc448140198b03238814c.cct / CCustomLoadingScreenConfiguration / pullFromUrl

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function pullFromUrl(_me: LingoMe, _this: LingoValue, a_sUrl: LingoValue) {
  if ((lingoTruthy(callNamed("stringp", a_sUrl)) ? 0 : 1)) {
  return callNamed("error", _this, "URL string was invalid. Cannot download loading screen configuration.", symbol("pullFromUrl"));
  }

  var tMemNum = callNamed("queueDownload", a_sUrl, a_sUrl, symbol("field"), 1);
  return callNamed("registerDownloadCallback", tMemNum, symbol("loadingCallback"), callMethod("getID", _this), a_sUrl);
}

