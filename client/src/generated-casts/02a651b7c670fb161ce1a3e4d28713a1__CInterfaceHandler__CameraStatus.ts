// 02a651b7c670fb161ce1a3e4d28713a1.cct / CInterfaceHandler / CameraStatus

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CameraStatus(_me: LingoMe, tMsg: LingoValue) {
  var tHasCamera = callMethod("GetIntFrom", tMsg.connection);
  if (lingoBinary("eq", tHasCamera, 1)) {
  callMethod("set", callNamed("getObject", symbol("session")), "HasCamera", 1)
  callMethod("ShowCameraIcon", callMethod("getMessageBar", callMethod("getInterface", _me)))
  } else {
  callMethod("hideCameraIcon", callMethod("getMessageBar", callMethod("getInterface", _me)))
  }

}

