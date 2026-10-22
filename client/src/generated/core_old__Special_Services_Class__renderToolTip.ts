// core.old.cct / Special Services Class / renderToolTip

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function renderToolTip(_me: LingoMe, tNextID: LingoValue) {
  if (meProp(_me, "pToolTipAct")) {
  if (lingoBinary("or", lingoBinary("neq", tNextID, meProp(_me, "pToolTipID")), callNamed("voidp", meProp(_me, "pToolTipID")))) {
  return 0;
  }

  setThePropOf(meProp(_me, "pToolTipSpr"), "loc", lingoBinary("add", theProperty("mouseLoc"), new LingoList([-float(2), 15])));
  setThePropOf(meProp(_me, "pToolTipSpr"), "visible", 1);
  callMethod("delay", _me, lingoBinary("mul", meProp(_me, "pToolTipDel"), 2), symbol("removeToolTip"), meProp(_me, "pToolTipID"))
  }

}

