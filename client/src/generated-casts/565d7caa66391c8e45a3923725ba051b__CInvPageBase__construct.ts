// 565d7caa66391c8e45a3923725ba051b.cct / CInvPageBase / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  callNamed("registerMessage", "teleport_selected", callMethod("getID", _this), symbol("TeleportSelected"))
  callNamed("registerMessage", "teleport_unselected", callMethod("getID", _this), symbol("TeleportUnSelected"))
  setMeProp(_me, "m_bReady", 0);
  setMeProp(_me, "m_bLoaded", 0);
  setMeProp(_me, "m_bVisible", 0);
  setMeProp(_me, "m_rWindow", undefined);
  setMeProp(_me, "m_rCurPageObj", undefined);
  setMeProp(_me, "m_kCurPageName", symbol("none"));
  setMeProp(_me, "m_mp_kType_mp_iRef_rItem", new LingoPropList([]));
  meProp(_me, "m_mp_kType_mp_iRef_rItem")[symbol("items")] = new LingoPropList([]);
  meProp(_me, "m_mp_kType_mp_iRef_rItem")[symbol("pins")] = new LingoPropList([]);
  meProp(_me, "m_mp_kType_mp_iRef_rItem")[symbol("clothes")] = new LingoPropList([]);
  meProp(_me, "m_mp_kType_mp_iRef_rItem")[symbol("posters")] = new LingoPropList([]);
  return 1;
}

