// d0e535313898676eb605277339b50f27.cct / CHiddenMickeyStatus / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_pMickeyList", undefined);
  setMeProp(_me, "m_sHiddenMickeyDetailWindowTitle", "Hidden Mickey Details");
  callNamed("registerMessage", "ShowHMDetailWindow", callMethod("getID", _this), symbol("showHiddenMickeyDetailsWindow"))
  return 1;
}

