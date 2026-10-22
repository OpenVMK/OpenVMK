// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomHandler / _AvatarSlogan

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _AvatarSlogan(_me: LingoMe, _this: LingoValue, a_rMsg: LingoValue) {
  var t_iRef = callMethod("GetIntFrom", a_rMsg.connection);
  var t_sTxt = callNamed("TransformCannedMsgToString", a_rMsg);
  var x = 0;
  var t_rCon = callMethod("_AccessRoom", _this.component);
  if ((lingoTruthy(callNamed("voidp", t_rCon)) ? 0 : 1)) {
  var t_rAvatar = callMethod("_AccessIndexed", t_rCon, t_iRef, "avatar");
  callMethod("SetParam", t_rAvatar, "DESC", t_sTxt)
  }

}

