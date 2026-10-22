// 7c66e5cfb5bd2e67ec4965cabbd6f88a.cct / CModeratorAKB / _CheckPermissions

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _CheckPermissions(_me: LingoMe, _this: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rWnd"))) {
  if (callNamed("listp", meProp(_me, "m_ar_PermList"))) {
  if (lingoBinary("gt", callMethod("findPos", meProp(_me, "m_ar_PermList"), "alert"), 0)) {
  if (callMethod("elementExists", meProp(_me, "m_rWnd"), "mods.alert")) {
  callMethod("Activate", callMethod("getElement", meProp(_me, "m_rWnd"), "mods.alert"))
  }

  } else {
  if (callMethod("elementExists", meProp(_me, "m_rWnd"), "mods.alert")) {
  callMethod("deactivate", callMethod("getElement", meProp(_me, "m_rWnd"), "mods.alert"))
  }

  }

  if (lingoBinary("gt", callMethod("findPos", meProp(_me, "m_ar_PermList"), "kick"), 0)) {
  if (callMethod("elementExists", meProp(_me, "m_rWnd"), "mods.kick")) {
  callMethod("Activate", callMethod("getElement", meProp(_me, "m_rWnd"), "mods.kick"))
  }

  } else {
  if (callMethod("elementExists", meProp(_me, "m_rWnd"), "mods.kick")) {
  callMethod("deactivate", callMethod("getElement", meProp(_me, "m_rWnd"), "mods.kick"))
  }

  }

  if (lingoBinary("gt", callMethod("findPos", meProp(_me, "m_ar_PermList"), "ban"), 0)) {
  if (callMethod("elementExists", meProp(_me, "m_rWnd"), "mods.ban")) {
  callMethod("Activate", callMethod("getElement", meProp(_me, "m_rWnd"), "mods.ban"))
  }

  } else {
  if (callMethod("elementExists", meProp(_me, "m_rWnd"), "mods.ban")) {
  callMethod("deactivate", callMethod("getElement", meProp(_me, "m_rWnd"), "mods.ban"))
  }

  }

  var t_ar_ElemList = new LingoList(["mods.akb.inputhd4", "mods.akb.inputhd5", "mods.bantime1.text", "mods.bantime2.text", "mods.bantime3.text", "mods.bantime4.text", "mods.bantime5.text"]);
  for (var i = 1; i <= t_ar_ElemList.count; ++i) {
  if (callMethod("elementExists", meProp(_me, "m_rWnd"), t_ar_ElemList[i])) {
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWnd"), t_ar_ElemList[i]), symbol("blend"), 15)
  }

  }

  }

  }

}

