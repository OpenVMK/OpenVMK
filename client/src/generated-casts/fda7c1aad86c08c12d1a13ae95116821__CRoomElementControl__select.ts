// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomElementControl / select

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function select(_me: LingoMe, _this: LingoValue, a_rSelected: LingoValue) {
  var t_bGuestMove = 0;
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_rSelected"))) ? 0 : 1)) {
  callMethod("Unselect", _this)
  }

  setMeProp(_me, "m_rSelected", a_rSelected);
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_rSelected"))) ? 0 : 1)) {
  t_bGuestMove = callNamed("value", callMethod("GetParam", callMethod("getObject", meProp(_me, "m_rSelected")), "GUESTMOVE"));
  }

  var t_bFurnish = callMethod("get", callNamed("getObject", symbol("session")), "room_furnish_mode");
  if (lingoBinary("and", t_bFurnish, (lingoTruthy(t_bGuestMove) ? 0 : 1))) {
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_rSelected"))) ? 0 : 1)) {
  if ((lingoTruthy(callNamed("voidp", callMethod("GetVisual", meProp(_me, "m_rSelected")))) ? 0 : 1)) {
  callMethod("select", callMethod("GetVisual", meProp(_me, "m_rSelected")), 1)
  }

  }

  var t_veScr = callMethod("GetScrPos", a_rSelected);
  var t_xOff = callMethod("getProperty", callMethod("getElement", meProp(_me, "m_rControls"), "place.regpoint"), symbol("locX"));
  var t_yOff = callMethod("getProperty", callMethod("getElement", meProp(_me, "m_rControls"), "place.regpoint"), symbol("locY"));
  callMethod("moveTo", meProp(_me, "m_rControls"), lingoBinary("sub", t_veScr.x, t_xOff), lingoBinary("sub", t_veScr.y, t_yOff))
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rControls"), "place.itemname"), callNamed("getText", lingoBinary("join", "item.", callMethod("GetParam", meProp(_me, "m_rSelected"), "TYPE"))))
  if (callMethod("get", callNamed("getObject", symbol("session")), "ControlRoom")) {
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rControls"), "place.move.button"), symbol("blend"), 100)
  } else {
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rControls"), "place.move.button"), symbol("blend"), 50)
  }

  if (callMethod("exists", callNamed("getObject", symbol("session")), "permissions")) {
  var t_ar_Permissions = callMethod("get", callNamed("getObject", symbol("session")), "permissions");
  if (lingoBinary("gte", t_ar_Permissions.count, 1)) {
  if (callMethod("exists", callNamed("getObject", symbol("session")), "build_version")) {
  if (lingoBinary("gte", callNamed("value", callMethod("get", callNamed("getObject", symbol("session")), "build_version")), float(9))) {
  if (lingoBinary("eq", callMethod("getPos", t_ar_Permissions, 12), 0)) {
  callMethod("hide", callMethod("getElement", meProp(_me, "m_rControls"), "place.vmks.button"))
  callMethod("hide", callMethod("getElement", meProp(_me, "m_rControls"), "place.state.button"))
  }

  }

  }

  }

  }

  } else {
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_rSelected"))) ? 0 : 1)) {
  if (t_bGuestMove) {
  t_veScr = callMethod("GetScrPos", a_rSelected);
  t_xOff = callMethod("getProperty", callMethod("getElement", meProp(_me, "m_rControls"), "place.regpoint"), symbol("locX"));
  t_yOff = callMethod("getProperty", callMethod("getElement", meProp(_me, "m_rControls"), "place.regpoint"), symbol("locY"));
  callMethod("moveTo", meProp(_me, "m_rControls"), lingoBinary("sub", t_veScr.x, t_xOff), lingoBinary("sub", t_veScr.y, t_yOff))
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rControls"), "place.itemname"), callNamed("getText", lingoBinary("join", "item.", callMethod("GetParam", meProp(_me, "m_rSelected"), "TYPE"))))
  callMethod("deactivate", callMethod("getElement", meProp(_me, "m_rControls"), "place.takeaway.button"))
  }

  }

  }

  if (lingoBinary("or", t_bFurnish, t_bGuestMove)) {
  callMethod("show", meProp(_me, "m_rControls"))
  } else {
  callMethod("hide", meProp(_me, "m_rControls"))
  }

}

