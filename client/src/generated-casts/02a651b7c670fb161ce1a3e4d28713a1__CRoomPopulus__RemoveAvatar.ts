// 02a651b7c670fb161ce1a3e4d28713a1.cct / CRoomPopulus / RemoveAvatar

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RemoveAvatar(_me: LingoMe, a_rMsg: LingoValue) {
  var t_iRef = callMethod("GetIntFrom", a_rMsg.connection);
  var t_rAvatar = callMethod("_AccessIndexed", callMethod("_AccessRoom", callNamed("getThread", "room").component), t_iRef, "avatar");
  if ((lingoTruthy(callNamed("voidp", t_rAvatar)) ? 0 : 1)) {
  var t_sName = callMethod("GetParam", t_rAvatar, "NAME");
  callMethod("RemoveOne", _me, t_sName)
  var t_ar_nameList = callNamed("GetCannedFreeWordList");
  if (lingoBinary("neq", callMethod("getOne", t_ar_nameList, t_sName), 0)) {
  callMethod("removeNameFromDictionary", _me, t_sName, t_ar_nameList)
  }

  callNamed("SetCannedFreeWordList", t_ar_nameList)
  }

}

