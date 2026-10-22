// 7c66e5cfb5bd2e67ec4965cabbd6f88a.cct / CModeratorToolInterface / ShowModsWindow

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ShowModsWindow(_me: LingoMe, _this: LingoValue) {
  if (callMethod("exists", callNamed("getObject", symbol("session")), "permissions")) {
  var t_ar_Permission = new LingoList(["alert", "kick", "ban", "mute", "roomalert", "roomkick", "roomban", "roommute", "forcenamechange", "searchAnyRoom"]);
  var t_ar_Permissions = callMethod("get", callNamed("getObject", symbol("session")), "permissions");
  if (callNamed("listp", t_ar_Permissions)) {
  var t_iListCount = t_ar_Permission.count;
  var t_ar_PermList = new LingoList([]);
  for (var i = 1; i <= t_ar_Permissions.count; ++i) {
  if (lingoBinary("gte", t_iListCount, t_ar_Permissions[i])) {
  callMethod("add", t_ar_PermList, t_ar_Permission[t_ar_Permissions[i]])
  }

  }

  if (callNamed("objectp", meProp(_me, "m_objModAKB"))) {
  callMethod("SetPermissions", meProp(_me, "m_objModMenu"), t_ar_PermList)
  }

  if (callNamed("objectp", meProp(_me, "m_objModMenu"))) {
  callMethod("SetPermissions", meProp(_me, "m_objModMenu"), t_ar_PermList)
  }

  }

  var t_sWndName = "mod_wnd";
  if (callNamed("createWindow", t_sWndName, "vmk_mods_button.window")) {
  var t_rWnd = callNamed("getWindow", t_sWndName);
  callMethod("moveTo", t_rWnd, 0, 0)
  callMethod("registerClient", t_rWnd, callMethod("getID", _this))
  callMethod("registerProcedure", t_rWnd, symbol("_EventProcModeratorWnd"), callMethod("getID", _this), symbol("mouseDown"))
  } else {
  return 0;
  }

  } else {
  return 0;
  }

}

