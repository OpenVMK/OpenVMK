// eba88a10adbb7784498c2112110c5871.cct / CGuestRoomNavigator / SendEditRoomInfo

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SendEditRoomInfo(_me: LingoMe, t_ar_roomName: LingoValue, t_ar_roomDesc: LingoValue) {
  var tMsg = new LingoPropList([symbol("int"), callMethod("GetSelectedRoomID", _me)]);
  var tCannedBlock = callNamed("TransformCannedToMsg", t_ar_roomName);
  callMethod("addProp", tMsg, symbol("int"), t_ar_roomName.count)
  for (var i = 1; i <= tCannedBlock.count; ++i) {
  var tKey = callMethod("getPropAt", tCannedBlock, i);
  var tvalue = tCannedBlock[i];
  callMethod("addProp", tMsg, tKey, tvalue)
  }

  tCannedBlock = callNamed("TransformCannedToMsg", t_ar_roomDesc);
  callMethod("addProp", tMsg, symbol("int"), t_ar_roomDesc.count)
  for (var i = 1; i <= tCannedBlock.count; ++i) {
  tKey = callMethod("getPropAt", tCannedBlock, i);
  tvalue = tCannedBlock[i];
  callMethod("addProp", tMsg, tKey, tvalue)
  }

  callMethod("send", callNamed("getConnection", "VMK"), 37, tMsg)
  callNamed("createTimeout", symbol("update_own_rooms_once"), 1000, symbol("updateOwnRoomInfo"), callMethod("getID", _me), undefined, 1)
  return 1;
}

