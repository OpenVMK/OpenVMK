// 565d7caa66391c8e45a3923725ba051b.cct / CInvTrade / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  callNamed("unregisterMessage", "teleport_selected", callMethod("getID", _this))
  callNamed("unregisterMessage", "teleport_unselected", callMethod("getID", _this))
  callNamed("executeMessage", "SetButtonStates", new LingoPropList([symbol("all"), 1]))
  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  callNamed("removeWindow", callMethod("getID", meProp(_me, "m_rWindow")))
  setMeProp(_me, "m_rWindow", undefined);
  }

  if (callNamed("objectp", meProp(_me, "m_rGridInvItems"))) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rGridInvItems")))
  setMeProp(_me, "m_rGridInvItems", undefined);
  }

  if (callNamed("objectp", meProp(_me, "m_rGridOwnItems"))) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rGridOwnItems")))
  setMeProp(_me, "m_rGridOwnItems", undefined);
  }

  if (callNamed("objectp", meProp(_me, "m_rGridHerItems"))) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rGridHerItems")))
  setMeProp(_me, "m_rGridHerItems", undefined);
  }

  if (callNamed("objectp", meProp(_me, "m_rHerGridLoadAnim"))) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rHerGridLoadAnim")))
  setMeProp(_me, "m_rHerGridLoadAnim", undefined);
  }

  if (callNamed("objectp", meProp(_me, "m_rOwnGridLoadAnim"))) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rOwnGridLoadAnim")))
  setMeProp(_me, "m_rOwnGridLoadAnim", undefined);
  }

  if (callNamed("objectp", meProp(_me, "m_rInvGridLoadAnim"))) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rInvGridLoadAnim")))
  setMeProp(_me, "m_rInvGridLoadAnim", undefined);
  }

  setMeProp(_me, "m_mp_iRef_rOwnItems", undefined);
  setMeProp(_me, "m_mp_iRef_rHerItems", undefined);
  setMeProp(_me, "m_mp_kType_mp_iRef_rItem", undefined);
  if (callNamed("objectp", meProp(_me, "m_rObjTradConf"))) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rObjTradConf")))
  setMeProp(_me, "m_rObjTradConf", undefined);
  }

  callMethod("set", callNamed("getObject", symbol("session")), "IsTrading", 0)
  callMethod("UnregisterItemListCallback", callMethod("GetInventory", callNamed("getThread", "inventory").component, 1), _this, symbol("_RefreshItemList"))
  return 1;
}

