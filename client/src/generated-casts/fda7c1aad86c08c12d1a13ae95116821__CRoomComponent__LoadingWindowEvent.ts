// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomComponent / LoadingWindowEvent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function LoadingWindowEvent(_me: LingoMe, _this: LingoValue, a_sBtnText: LingoValue) {
  if (callMethod("exists", callNamed("getObjectManager"), "RoomAssetLoadingDialog")) {
  callMethod("DeleteWindow", callNamed("getObject", "RoomAssetLoadingDialog"))
  callNamed("removeObject", "RoomAssetLoadingDialog")
  }

  callMethod("FlushQueue", callNamed("getObject", "RoomItemAssetManager"))
  callNamed("executeMessage", "room_remove")
  callNamed("executeMessage", symbol("ui_navigator"))
}

