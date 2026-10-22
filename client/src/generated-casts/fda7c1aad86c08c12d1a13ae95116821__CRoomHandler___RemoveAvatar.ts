// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomHandler / _RemoveAvatar

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _RemoveAvatar(_me: LingoMe, _this: LingoValue, a_rMsg: LingoValue) {
  var t_iRef = callMethod("GetIntFrom", a_rMsg.connection);
  var t_rTransfer = new LingoPropList([symbol("input"), new LingoList([]), symbol("Output"), undefined, symbol("avatar"), t_iRef]);
  callNamed("executeMessage", "RemoveAvatar", t_rTransfer)
  var t_rContext = callMethod("_AccessRoom", callMethod("getComponent", _this));
  if (callNamed("objectp", t_rContext)) {
  callMethod("_RemoveIndexed", t_rContext, t_iRef, "avatar")
  } else {
  callNamed("error", _this, "Room context not available!", symbol("_RemoveAvatar"))
  }

}

