// core.old.cct / CWindowFieldWrapper / scrollMe

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function scrollMe(_me: LingoMe) {
  var t_height = _me.pSprite.height;
  var t_cursorOffset = callMethod("charPosToLoc", meProp(_me, "pMember"), theProperty("selStart")).locV;
  var t_offset = meProp(_me, "pOffY");
  var t_test = 0;
  if (lingoBinary("gt", t_cursorOffset, t_height)) {
  t_test = lingoBinary("sub", t_cursorOffset, t_height);
  }

  if (lingoBinary("gt", t_test, t_offset)) {
  t_offset = t_test;
  } else {
  if (lingoBinary("lt", t_cursorOffset, t_offset)) {
  t_offset = t_cursorOffset;
  }

  }

  if (lingoBinary("eq", t_test, 0)) {
  if (lingoBinary("lt", t_cursorOffset, 20)) {
  t_offset = 0;
  }

  }

  setMeProp(_me, "pOffY", t_offset);
  var tScrollList = new LingoList([]);
  var tWndObj = callMethod("get", callNamed("getWindowManager"), _me.pMotherId);
  for (var tScrollId of meProp(_me, "pScrolls").toArray()) {
  callMethod("add", tScrollList, callMethod("getElement", tWndObj, tScrollId))
  }

  callNamed("call", symbol("sendAdjustOffsetTo"), tScrollList, t_offset)
}

