// 7c66e5cfb5bd2e67ec4965cabbd6f88a.cct / CModeratorMenu / _CheckPermissions

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
  if (lingoBinary("gt", callMethod("findPos", meProp(_me, "m_ar_PermList"), "mute"), 0)) {
  if (callMethod("elementExists", meProp(_me, "m_rWnd"), "mods.mute.single")) {
  callMethod("Activate", callMethod("getElement", meProp(_me, "m_rWnd"), "mods.mute.single"))
  }

  } else {
  if (callMethod("elementExists", meProp(_me, "m_rWnd"), "mods.mute.single")) {
  callMethod("deactivate", callMethod("getElement", meProp(_me, "m_rWnd"), "mods.mute.single"))
  }

  }

  if (lingoBinary("gt", callMethod("findPos", meProp(_me, "m_ar_PermList"), "roommute"), 0)) {
  if (callMethod("elementExists", meProp(_me, "m_rWnd"), "mods.mute")) {
  callMethod("Activate", callMethod("getElement", meProp(_me, "m_rWnd"), "mods.mute"))
  }

  } else {
  if (callMethod("elementExists", meProp(_me, "m_rWnd"), "mods.mute")) {
  callMethod("deactivate", callMethod("getElement", meProp(_me, "m_rWnd"), "mods.mute"))
  }

  }

  if (lingoBinary("gt", callMethod("findPos", meProp(_me, "m_ar_PermList"), "forcenamechange"), 0)) {
  if (callMethod("elementExists", meProp(_me, "m_rWnd"), "mods.forcename")) {
  callMethod("Activate", callMethod("getElement", meProp(_me, "m_rWnd"), "mods.forcename"))
  }

  } else {
  if (callMethod("elementExists", meProp(_me, "m_rWnd"), "mods.forcename")) {
  callMethod("deactivate", callMethod("getElement", meProp(_me, "m_rWnd"), "mods.forcename"))
  }

  }

  }

  }

}

