// 02a651b7c670fb161ce1a3e4d28713a1.cct / CRoomPopulus / CreateAvatar

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreateAvatar(_me: LingoMe, a_rMsg: LingoValue) {
  var t_rInput = a_rMsg.connection;
  var t_iCount = callMethod("GetIntFrom", t_rInput);
  for (var i = 1; i <= t_iCount; ++i) {
  var t_sName = callMethod("GetStrFrom", t_rInput);
  var t_iSex = callMethod("GetIntFrom", t_rInput);
  var t_sDesc = callMethod("GetStrFrom", t_rInput);
  var t_ar_iFigure = new LingoList([]);
  for (var j = 1; j <= 12; ++j) {
  callMethod("append", t_ar_iFigure, callMethod("GetIntFrom", t_rInput))
  }

  var t_iPins = callMethod("GetIntFrom", t_rInput);
  var t_ar_ar_iPins = new LingoList([]);
  for (var j = 1; j <= t_iPins; ++j) {
  var t_iCode = callMethod("GetIntFrom", t_rInput);
  var t_iLevel = callMethod("GetIntFrom", t_rInput);
  var t_iSingleUse = callMethod("GetIntFrom", t_rInput);
  callMethod("add", t_ar_ar_iPins, new LingoList([t_iCode, t_iLevel, t_iSingleUse]))
  }

  var t_iIcons = callMethod("GetIntFrom", t_rInput);
  var t_ar_iIcons = new LingoList([]);
  for (var j = 1; j <= t_iIcons; ++j) {
  t_iCode = callMethod("GetIntFrom", t_rInput);
  callMethod("add", t_ar_iIcons, t_iCode)
  }

  var t_iRef = callMethod("GetIntFrom", t_rInput);
  var t_iTile = callMethod("GetIntFrom", t_rInput);
  var t_iStack = callMethod("GetIntFrom", t_rInput);
  var t_ar_iActions = new LingoList([]);
  for (var j = 1; j <= 12; ++j) {
  callMethod("add", t_ar_iActions, callMethod("GetIntFrom", t_rInput))
  }

  callMethod("AddOne", _me, t_sName)
  }

  var t_ar_nameList = callNamed("GetCannedFreeWordList");
  for (var t_sName of meProp(_me, "m_ar_sPopulus").toArray()) {
  if (lingoBinary("eq", callMethod("getOne", t_ar_nameList, t_sName), 0)) {
  callMethod("padNameForDictionary", _me, t_sName, t_ar_nameList)
  }

  }

  callNamed("SetCannedFreeWordList", t_ar_nameList)
}

