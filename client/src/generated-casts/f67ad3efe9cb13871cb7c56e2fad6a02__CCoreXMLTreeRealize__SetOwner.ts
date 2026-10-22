// f67ad3efe9cb13871cb7c56e2fad6a02.cct / CCoreXMLTreeRealize / SetOwner

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetOwner(_me: LingoMe, _this: LingoValue, a_rObj: LingoValue) {
  setMeProp(_me, "m_rParent", a_rObj);
}

