// d0e535313898676eb605277339b50f27.cct / CAvatarBuilderInterface / OpenCloseSettings

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function OpenCloseSettings(_me: LingoMe, _this: LingoValue) {
  if (callNamed("voidp", meProp(_me, "m_rWindow2"))) {
  callMethod("update", meProp(_me, "m_rCurPageObj2"), undefined, undefined)
  setMeProp(_me, "m_rWindow2", callMethod("GetWindowObj", meProp(_me, "m_rCurPageObj2")));
  } else {
  if (callNamed("objectp", meProp(_me, "m_rCurPageObj2"))) {
  callMethod("CloseSettings", meProp(_me, "m_rCurPageObj2"))
  setMeProp(_me, "m_rWindow2", undefined);
  }

  }

}

