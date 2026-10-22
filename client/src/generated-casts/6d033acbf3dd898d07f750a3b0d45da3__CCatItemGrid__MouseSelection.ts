// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCatItemGrid / MouseSelection

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function MouseSelection(_me: LingoMe, _this: LingoValue, a_ptLoc: LingoValue) {
  var t_iRow = lingoBinary("add", lingoBinary("div", a_ptLoc.locV, lingoBinary("add", meProp(_me, "m_rcItemSize").height, lingoBinary("mul", 2, meProp(_me, "m_iMarginV")))), 1);
  var t_iSlot = lingoBinary("add", lingoBinary("div", a_ptLoc.locH, lingoBinary("add", meProp(_me, "m_rcItemSize").width, lingoBinary("mul", 2, meProp(_me, "m_iMarginH")))), 1);
  callMethod("select", _this, lingoBinary("add", lingoBinary("mul", lingoBinary("sub", t_iRow, 1), meProp(_me, "m_iSlotsPerRow")), t_iSlot))
}

