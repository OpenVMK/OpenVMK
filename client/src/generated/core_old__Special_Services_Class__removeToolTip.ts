// core.old.cct / Special Services Class / removeToolTip

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function removeToolTip(_me: LingoMe, tNextID: LingoValue) {
  if (meProp(_me, "pToolTipAct")) {
  if (lingoBinary("or", callNamed("voidp", tNextID), lingoBinary("eq", meProp(_me, "pToolTipID"), tNextID))) {
  setMeProp(_me, "pToolTipID", undefined);
  setThePropOf(meProp(_me, "pToolTipSpr"), "visible", 0);
  return 1;
  }

  }

}

