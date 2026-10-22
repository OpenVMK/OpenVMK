// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomElementControl / PlacePosterCbk

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PlacePosterCbk(_me: LingoMe, _this: LingoValue, a_iWallRef: LingoValue, a_veRelPos: LingoValue) {
  callNamed("unregisterMessage", "move_poster_end", callMethod("getID", _this))
  callNamed("unregisterMessage", "move_poster_failed", callMethod("getID", _this))
  if (callNamed("objectp", meProp(_me, "m_rSelected"))) {
  var t_iX = callNamed("integer", a_veRelPos.x);
  var t_iY = callNamed("integer", a_veRelPos.y);
  var t_iZ = callNamed("integer", a_veRelPos.z);
  var t_rParams = new LingoPropList([symbol("int"), callNamed("integer", callMethod("GetParam", meProp(_me, "m_rSelected"), "REF")), symbol("int"), a_iWallRef, symbol("int"), t_iX, symbol("int"), t_iY, symbol("int"), t_iZ]);
  callMethod("send", callNamed("getConnection", "VMK"), "MovePoster", t_rParams)
  }

  callMethod("Unselect", _this)
}

