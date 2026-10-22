// 6df220c58a1fbfc6fa5eee1823840b41.cct / CRoomInfoInterface / SendEditRoomInfo

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SendEditRoomInfo(_me: LingoMe, t_ar_roomName: LingoValue, t_ar_roomDesc: LingoValue) {
  var tMsg = new LingoPropList([]);
  var tCannedBlock = callNamed("TransformCannedToMsg", t_ar_roomName);
  for (var i = 1; i <= tCannedBlock.count; ++i) {
  var tKey = callMethod("getPropAt", tCannedBlock, i);
  var tvalue = tCannedBlock[i];
  callMethod("addProp", tMsg, tKey, tvalue)
  }

  tCannedBlock = callNamed("TransformCannedToMsg", t_ar_roomDesc);
  for (var i = 1; i <= tCannedBlock.count; ++i) {
  tKey = callMethod("getPropAt", tCannedBlock, i);
  tvalue = tCannedBlock[i];
  callMethod("addProp", tMsg, tKey, tvalue)
  }

  callMethod("send", callNamed("getConnection", "VMK"), 594, tMsg)
  callNamed("createTimeout", symbol("update_own_rooms_once"), 1000, symbol("updateOwnRoomInfo"), callMethod("getID", _me), undefined, 1)
  return 1;
}

