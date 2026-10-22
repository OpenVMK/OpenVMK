// 565d7caa66391c8e45a3923725ba051b.cct / CInvPageBase / open

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function open(_me: LingoMe, _this: LingoValue) {
  if (callMethod("getInventoryLoaded", callMethod("getComponent", callNamed("getThread", "inventory")))) {
  setMeProp(_me, "m_bLoaded", 1);
  } else {
  callMethod("_LoadInventory", callNamed("getThread", "inventory").component)
  }

  if (meProp(_me, "m_bReady")) {
  callMethod("show", meProp(_me, "m_rWindow"))
  setMeProp(_me, "m_bVisible", 1);
  } else {
  setMeProp(_me, "m_bVisible", 0);
  callNamed("error", _this, "Failed to open inventory page!", symbol("open"))
  }

  switch (meProp(_me, "m_kCurPageName")) {
case symbol("credits"):
  callMethod("update", meProp(_me, "m_rCurPageObj"), callNamed("getThread", "inventory").component.m_iCredits, symbol("credits"))
  break;
case symbol("items"):
  callMethod("checkTeleporterSelection", meProp(_me, "m_rCurPageObj"))
  break;
case symbol("posters"):
  break;
case symbol("pins"):
  break;
case symbol("clothes"):
  break;
case symbol("code"):
  callMethod("open", meProp(_me, "m_rCurPageObj"))
  break;
  }

  return meProp(_me, "m_bVisible");
}

