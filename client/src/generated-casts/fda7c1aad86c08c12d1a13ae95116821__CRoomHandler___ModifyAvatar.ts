// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomHandler / _ModifyAvatar

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _ModifyAvatar(_me: LingoMe, _this: LingoValue, a_rMsg: LingoValue) {
  var t_rInput = a_rMsg.connection;
  var t_rContext = callMethod("_AccessRoom", callMethod("getComponent", _this));
  if (callNamed("voidp", t_rContext)) {
  return callNamed("error", _this, "Room context not available!", symbol("_ModifyAvatar"));
  }

  var t_iRef = callMethod("GetIntFrom", t_rInput);
  var t_rObj = callMethod("_AccessIndexed", t_rContext, t_iRef, "avatar");
  if (callNamed("objectp", t_rObj)) {
  var t_ar_iFigure = new LingoList([]);
  for (var j = 1; j <= 12; ++j) {
  callMethod("append", t_ar_iFigure, callMethod("GetIntFrom", t_rInput))
  }

  callMethod("SetOutlook", callMethod("GetVisual", t_rObj), t_ar_iFigure)
  t_iRef = callMethod("GetIntFrom", t_rInput);
  var t_iTile = callMethod("GetIntFrom", t_rInput);
  var t_iStack = callMethod("GetIntFrom", t_rInput);
  var t_ar_iActions = new LingoList([]);
  for (var j = 1; j <= 12; ++j) {
  callMethod("add", t_ar_iActions, callMethod("GetIntFrom", t_rInput))
  }

  var t_rTransfer = new LingoPropList([symbol("input"), t_ar_iFigure, symbol("Output"), callMethod("GetRenderer", callMethod("GetVisual", t_rObj)), symbol("avatar"), t_rObj]);
  callNamed("executeMessage", "CreateAvatar", t_rTransfer)
  if (callNamed("objectp", t_rTransfer.Output)) {
  callMethod("SetRenderer", callMethod("GetVisual", t_rObj), t_rTransfer.Output)
  callMethod("Actions", callMethod("GetVisual", t_rObj), t_ar_iActions)
  }

  }

}

