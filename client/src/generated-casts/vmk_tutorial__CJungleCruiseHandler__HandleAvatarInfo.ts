// vmk_tutorial.cct / CJungleCruiseHandler / HandleAvatarInfo

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function HandleAvatarInfo(_me: LingoMe, tMsg: LingoValue) {
  var t_sName = callMethod("GetStrFrom", tMsg.connection);
  var t_iSex = callMethod("GetIntFrom", tMsg.connection);
  var t_sSlogan = callMethod("GetStrFrom", tMsg.connection);
  var t_ar_FigData = new LingoList([]);
  while (lingoBinary("gt", tMsg.connection.pMsgStruct.content.length, 0)) {
  var t_iData = callMethod("GetIntFrom", tMsg.connection);
  callMethod("add", t_ar_FigData, t_iData)
  }

  callMethod("SetAvatarFigure", callMethod("getComponent", _me), t_ar_FigData)
}

