// eba88a10adbb7784498c2112110c5871.cct / Navigator Handler Class / InstanceInfo

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function InstanceInfo(_me: LingoMe, tMsg: LingoValue) {
  var t_mpInstanceData = new LingoPropList([]);
  var t_iSpaceID = callMethod("GetIntFrom", tMsg.connection);
  var t_iMaxUsers = callMethod("GetIntFrom", tMsg.connection);
  var t_iInstanceCount = callMethod("GetIntFrom", tMsg.connection);
  for (var i = 1; i <= t_iInstanceCount; ++i) {
  var t_iID = callMethod("GetIntFrom", tMsg.connection);
  var t_iUserCount = callMethod("GetIntFrom", tMsg.connection);
  callMethod("addProp", t_mpInstanceData, t_iID, new LingoPropList([symbol("maxusers"), t_iMaxUsers, symbol("usercount"), t_iUserCount]))
  }

}

