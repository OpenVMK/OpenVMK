// core.old.cct / CWriter / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_rDefRect", callNamed("rect", 0, 0, 480, 480));
  setMeProp(_me, "m_rTxtRect", undefined);
  setMeProp(_me, "m_rFntStru", undefined);
  setMeProp(_me, "m_rMember", callNamed("member", callMethod("createMember", callNamed("getResourceManager"), lingoBinary("join", "writer_", callNamed("getUniqueID")), symbol("text"))));
  if (lingoBinary("eq", meProp(_me, "m_rMember")._number, 0)) {
  return 0;
  } else {
  setThePropOf(meProp(_me, "m_rMember"), "alignment", symbol("left"));
  setThePropOf(meProp(_me, "m_rMember"), "wordWrap", 0);
  return 1;
  }

}

