// 239fb1d2675fc448140198b03238814c.cct / CCustomLoadingScreen / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  if (callNamed("windowExists", "room_custom_load_wnd")) {
  callNamed("removeWindow", "room_custom_load_wnd")
  }

  if (callNamed("objectExists", "room_status_bar")) {
  callNamed("removeObject", "room_status_bar")
  }

  return 1;
}

