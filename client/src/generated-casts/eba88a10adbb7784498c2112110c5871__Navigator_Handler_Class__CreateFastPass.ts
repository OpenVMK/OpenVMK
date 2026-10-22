// eba88a10adbb7784498c2112110c5871.cct / Navigator Handler Class / CreateFastPass

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreateFastPass(_me: LingoMe, a_rMsg: LingoValue) {
  var t_iSpaceID = callMethod("GetIntFrom", a_rMsg.connection);
  var t_iInstanceId = callMethod("GetIntFrom", a_rMsg.connection);
  var t_sSpaceName = callMethod("GetStrFrom", a_rMsg.connection);
  var t_iPosInQueue = callMethod("GetIntFrom", a_rMsg.connection);
  var t_mp_FastPassData = new LingoPropList([symbol("spaceid"), t_iSpaceID, symbol("instanceID"), t_iInstanceId, symbol("spaceName"), t_sSpaceName, symbol("queuePos"), t_iPosInQueue]);
  callMethod("CreateFastPass", _me.component, t_mp_FastPassData)
}

