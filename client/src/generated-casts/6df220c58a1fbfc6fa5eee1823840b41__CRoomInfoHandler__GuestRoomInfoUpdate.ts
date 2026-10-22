// 6df220c58a1fbfc6fa5eee1823840b41.cct / CRoomInfoHandler / GuestRoomInfoUpdate

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GuestRoomInfoUpdate(_me: LingoMe, tMsg: LingoValue) {
  var tRoomTag = callMethod("GetIntFrom", tMsg.connection);
  var tRoomName = callMethod("GetStrFrom", tMsg.connection);
  var tRoomDesc = callMethod("GetStrFrom", tMsg.connection);
  var t_iNewAccessibilityCode = callMethod("GetIntFrom", tMsg.connection);
  callMethod("setRoomAccesCode", callMethod("getComponent", _me), t_iNewAccessibilityCode)
  callMethod("setRoomName", callMethod("getComponent", _me), tRoomName)
  callMethod("setRoomDesc", callMethod("getComponent", _me), tRoomDesc)
}

