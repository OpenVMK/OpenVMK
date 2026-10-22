// core.old.cct / Special Services Class / createToolTip

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function createToolTip(_me: LingoMe, tText: LingoValue) {
  if (meProp(_me, "pToolTipAct")) {
  if (callNamed("voidp", meProp(_me, "pToolTipMem"))) {
  callMethod("prepareToolTip", _me)
  }

  if (callNamed("voidp", meProp(_me, "pToolTipSpr"))) {
  callMethod("prepareToolTip", _me)
  }

  if (callNamed("voidp", tText)) {
  tText = "...";
  }

  setThePropOf(meProp(_me, "pToolTipSpr"), "visible", 0);
  setThePropOf(meProp(_me, "pToolTipMem"), "rect", callNamed("rect", 0, 0, lingoBinary("mul", callNamed("length", tText.line[1]), 8), 20));
  setThePropOf(meProp(_me, "pToolTipMem"), "text", tText);
  setMeProp(_me, "pToolTipID", theProperty("milliSeconds"));
  return callMethod("delay", _me, meProp(_me, "pToolTipDel"), symbol("renderToolTip"), meProp(_me, "pToolTipID"));
  }

}

