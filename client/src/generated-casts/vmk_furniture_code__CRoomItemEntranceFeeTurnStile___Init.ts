// vmk_furniture_code.cct / CRoomItemEntranceFeeTurnStile / _Init

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
  if (callMethod("AreWeReady", _this)) {
  if (_this.m_ar_sKey.count) {
  callMethod("SetBlockVisualCursors", callMethod("GetVisual", t_rObj), new LingoList([callNamed("getMember", "cursor.finger"), callNamed("getMember", "cursor.finger.mask")]), new LingoList([new LingoList([1, 2]), new LingoList([1, 2])]))
  setMeProp(_me, "m_bReady", 1);
  callMethod("setState", _this, callMethod("GetParam", t_rObj, "STATE"))
  }

  }

}

