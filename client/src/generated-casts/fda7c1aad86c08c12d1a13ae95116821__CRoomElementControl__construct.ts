// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomElementControl / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_rSelected", undefined);
  var t_sID = callNamed("getUniqueID");
  callNamed("createObject", "RoomObjectPlacer", "CRoomObjectPlacer")
  callNamed("registerMessage", "room_furnish_mode", callMethod("getID", _this), symbol("_SetFurnishMode"))
  var t_sWindowName = "vmk_place_item.window";
  if (callMethod("exists", callNamed("getObject", symbol("session")), "permissions")) {
  var t_ar_Permissions = callMethod("get", callNamed("getObject", symbol("session")), "permissions");
  if (lingoBinary("gte", t_ar_Permissions.count, 1)) {
  if (callMethod("exists", callNamed("getObject", symbol("session")), "build_version")) {
  if (lingoBinary("gte", callNamed("value", callMethod("get", callNamed("getObject", symbol("session")), "build_version")), float(9))) {
  t_sWindowName = "vmk_place_item_vmks.window";
  }

  }

  }

  }

  if (callNamed("createWindow", t_sID, t_sWindowName)) {
  setMeProp(_me, "m_rControls", callNamed("getWindow", t_sID));
  callMethod("hide", meProp(_me, "m_rControls"))
  callMethod("registerClient", meProp(_me, "m_rControls"), callMethod("getID", _this))
  callMethod("registerProcedure", meProp(_me, "m_rControls"), symbol("_EventProc"), callMethod("getID", _this), symbol("mouseUp"))
  return 1;
  } else {
  return callNamed("error", _this, "Failed to prepare control window!", symbol("construct"));
  }

}

