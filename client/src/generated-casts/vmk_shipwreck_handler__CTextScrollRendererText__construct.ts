// vmk_shipwreck_handler.cct / CTextScrollRendererText / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_sWriterID", lingoBinary("join", "Scroller Write n:", theProperty("milliSeconds")));
  var tPlain = callNamed("getStructVariable", "struct.font.plain");
  callNamed("createWriter", meProp(_me, "m_sWriterID"), tPlain)
}

