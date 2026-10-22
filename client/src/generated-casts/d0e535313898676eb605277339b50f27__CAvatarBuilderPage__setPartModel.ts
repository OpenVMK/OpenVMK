// d0e535313898676eb605277339b50f27.cct / CAvatarBuilderPage / setPartModel

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setPartModel(_me: LingoMe, _this: LingoValue, tPart: LingoValue, tmodel: LingoValue) {
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_ar_BodyPartObjects"))) ? 0 : 1)) {
  callNamed("call", symbol("setModel"), meProp(_me, "m_ar_BodyPartObjects")[tPart], tmodel)
  }

}

