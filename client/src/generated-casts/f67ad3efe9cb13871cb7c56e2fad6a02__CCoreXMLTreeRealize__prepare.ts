// f67ad3efe9cb13871cb7c56e2fad6a02.cct / CCoreXMLTreeRealize / prepare

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function prepare(_me: LingoMe, _this: LingoValue) {
  callNamed("call", symbol("prepare"), meProp(_me, "m_rChilds"))
}

