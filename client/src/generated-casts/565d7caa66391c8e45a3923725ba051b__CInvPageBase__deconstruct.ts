// 565d7caa66391c8e45a3923725ba051b.cct / CInvPageBase / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  callNamed("unregisterMessage", "teleport_selected", callMethod("getID", _this), symbol("TeleportSelected"))
  callNamed("unregisterMessage", "teleport_unselected", callMethod("getID", _this), symbol("TeleportUnSelected"))
  if (meProp(_me, "m_bReady")) {
  callNamed("unregisterMessage", symbol("ui_inventory"), callMethod("getID", _this))
  callNamed("unregisterMessage", "room_leave", callMethod("getID", _this))
  callNamed("unregisterMessage", "hide_inventory", callMethod("getID", _this))
  callNamed("unregisterMessage", "show_inventory", callMethod("getID", _this))
  if (callNamed("objectp", meProp(_me, "m_rCurPageObj"))) {
  callMethod("Purge", meProp(_me, "m_rCurPageObj"), meProp(_me, "m_rWindow"))
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rCurPageObj")))
  setMeProp(_me, "m_rCurPageObj", undefined);
  }

  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  callNamed("removeWindow", callMethod("getID", meProp(_me, "m_rWindow")))
  setMeProp(_me, "m_rWindow", undefined);
  }

  }

  callMethod("UnregisterItemListCallback", callMethod("GetInventory", callNamed("getThread", "inventory").component, 1), _this, symbol("update"))
  setMeProp(_me, "m_bReady", 0);
  setMeProp(_me, "m_bLoaded", 0);
  setMeProp(_me, "m_bVisible", 0);
  return 1;
}

