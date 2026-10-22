// fb329984daeb374016fc0289347418de.cct / CRoomObjectType3008 / _Init

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _Init(_me: LingoMe, _this: LingoValue) {
  var t_rObj = callMethod("getObject", _this);
  callMethod("setcursor", callMethod("GetVisual", t_rObj), new LingoList([callNamed("getMember", "cursor.finger"), callNamed("getMember", "cursor.finger.mask")]), new LingoList([1]))
  setMeProp(_me, "m_bReady", 1);
}

