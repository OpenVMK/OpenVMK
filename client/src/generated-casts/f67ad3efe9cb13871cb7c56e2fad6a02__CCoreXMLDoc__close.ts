// f67ad3efe9cb13871cb7c56e2fad6a02.cct / CCoreXMLDoc / close

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function close(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_rRoot", new LingoPropList([symbol("type"), "xml", symbol("value"), "", symbol("param"), new LingoPropList([]), symbol("child"), new LingoPropList([])]));
  setMeProp(_me, "m_rNull", new LingoPropList([symbol("type"), "", symbol("value"), "", symbol("param"), new LingoPropList([]), symbol("child"), new LingoPropList([])]));
  setMeProp(_me, "m_rRef", meProp(_me, "m_rRoot"));
  return 1;
}

