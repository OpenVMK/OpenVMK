// 239fb1d2675fc448140198b03238814c.cct / CMainComponent / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  callMethod("set", callNamed("getObject", symbol("session")), "build_version", callNamed("getVariable", "build.version", "1.0"))
  setMeProp(_me, "m_rProcessManager", callNamed("createObject", "MainProcessManager", "CMainProcessManager"));
  setMeProp(_me, "m_rCustomLoadingScreenConfiguration", callNamed("createObject", "CustomLoadingScreenConf", "CCustomLoadingScreenConfiguration"));
  callMethod("pullFromUrl", meProp(_me, "m_rCustomLoadingScreenConfiguration"), callNamed("getVariable", "loadingscreens_url"))
  callMethod("initializeUrl", meProp(_me, "m_rCustomLoadingScreenConfiguration"), callNamed("getVariable", "loadingscreens_url"))
  callNamed("registerMessage", "GetMixedThumbnail", callMethod("getID", _this), symbol("_GetMixedThumbnail"))
  callNamed("registerMessage", "GetMixedPreview", callMethod("getID", _this), symbol("_GetMixedPreview"))
  return 1;
}

