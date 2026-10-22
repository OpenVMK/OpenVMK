// eba88a10adbb7784498c2112110c5871.cct / CThemedGuestRoomNavigator / IsVisible

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function IsVisible(_me: LingoMe) {
  if (callNamed("windowExists", meProp(_me, "m_sWindowTitle"))) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWindowTitle"));
  return callMethod("getProperty", tWndObj, symbol("visible"));
  } else {
  return 0;
  }

}

