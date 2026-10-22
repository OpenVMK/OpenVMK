// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomHandler / _AvatarInfo

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _AvatarInfo(_me: LingoMe, _this: LingoValue, a_rMsg: LingoValue) {
  var t_iOwnRef = callMethod("GetIntFrom", a_rMsg.connection);
  callMethod("set", callNamed("getObject", symbol("session")), "room_own_avatar", t_iOwnRef)
}

