// 239fb1d2675fc448140198b03238814c.cct / CMainComponent / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  callNamed("unregisterMessage", "GetMixedThumbnail", callMethod("getID", _this))
  callNamed("unregisterMessage", "GetMixedPreview", callMethod("getID", _this))
  if (callNamed("objectExists", "MainProcessManager")) {
  callNamed("removeObject", "MainProcessManager")
  }

  if (callNamed("objectExists", "CustomLoadingScreenConf")) {
  callNamed("removeObject", "CustomLoadingScreenConf")
  }

  setMeProp(_me, "m_rProcessManager", undefined);
  return 1;
}

