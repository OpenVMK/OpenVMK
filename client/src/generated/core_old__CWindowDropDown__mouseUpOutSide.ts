// core.old.cct / CWindowDropDown / mouseUpOutSide

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function mouseUpOutSide(_me: LingoMe) {
  setMeProp(_me, "pClickPass", 0);
  setMeProp(_me, "pState", symbol("close"));
  setMeProp(_me, "pLastRollOver", undefined);
  setThePropOf(_me, "pImage", meProp(_me, "pDropActiveBtnImg"));
  callMethod("render", _me)
  setThePropOf(_me.pSprite, "loc", meProp(_me, "pLoc"));
  return 0;
}

