// 565d7caa66391c8e45a3923725ba051b.cct / CInvPagePins / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  for (var tPin of meProp(_me, "m_mp_kType_mp_iRef_rItem")[symbol("pins")].toArray()) {
  callMethod("setaProp", tPin, symbol("state"), symbol("normal"))
  }

  if (callNamed("writerExists", meProp(_me, "m_sWriterID"))) {
  callNamed("removeWriter", meProp(_me, "m_sWriterID"))
  }

  if (callNamed("writerExists", meProp(_me, "m_sWriter2Id"))) {
  callNamed("removeWriter", meProp(_me, "m_sWriter2Id"))
  }

  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  callMethod("Purge", _this, meProp(_me, "m_rWindow"))
  }

  if (callNamed("objectp", meProp(_me, "m_rGridRenderer"))) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rGridRenderer")))
  setMeProp(_me, "m_rGridRenderer", undefined);
  }

  if (callNamed("objectp", meProp(_me, "m_rWornRenderer"))) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rWornRenderer")))
  setMeProp(_me, "m_rWornRenderer", undefined);
  }

  setMeProp(_me, "m_mp_kType_mp_iRef_rItem", new LingoPropList([]));
  return 1;
}

