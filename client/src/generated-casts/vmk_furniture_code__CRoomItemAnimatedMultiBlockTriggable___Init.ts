// vmk_furniture_code.cct / CRoomItemAnimatedMultiBlockTriggable / _Init

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _Init(_me: LingoMe) {
  var t_rItem = callMethod("getObject", _me);
  if (callMethod("IsReady", callMethod("GetVisual", t_rItem))) {
  var tStruct = callMethod("GetParam", t_rItem, "STRUCT");
  var tAnimDir = new LingoList([]);
  for (var tSub of tStruct.child.toArray()) {
  var tAnimStruct = new LingoList([]);
  var tElementClickable = new LingoList([]);
  for (var tBlk of tSub.child.toArray()) {
  var tAnimBlk = new LingoList([]);
  var tBlockClickable = new LingoList([]);
  var i = 1;
  for (var tSpr of tBlk.child.toArray()) {
  var tBaseName = callMethod("getaProp", tSpr.param, "GFX");
  var tAnimSpr = new LingoList([callNamed("getMember", tBaseName)]);
  var tNum = lingoBinary("add", callNamed("integer", lastChunk(tBaseName, "char")), 1);
  tBaseName = deleteStringChunk(tBaseName, "char", -30000, 0);
  while (callNamed("memberExists", lingoBinary("join", tBaseName, tNum))) {
  callMethod("append", tAnimSpr, callNamed("getMember", lingoBinary("join", tBaseName, tNum)))
  tNum = lingoBinary("add", tNum, 1);
  }

  callMethod("append", tAnimBlk, tAnimSpr)
  callMethod("append", tBlockClickable, i)
  i = lingoBinary("add", i, 1);
  }

  callMethod("append", tAnimStruct, tAnimBlk)
  callMethod("append", tElementClickable, tBlockClickable)
  }

  callMethod("append", tAnimDir, tAnimStruct)
  }

  setMeProp(_me, "m_mpFrameList", tAnimDir);
  callMethod("SetBlockVisualCursors", callMethod("GetVisual", t_rItem), new LingoList([callNamed("getMember", "cursor.finger"), callNamed("getMember", "cursor.finger.mask")]), tElementClickable)
  setMeProp(_me, "m_bReady", 1);
  callMethod("setState", _me, meProp(_me, "m_iState"))
  }

}

