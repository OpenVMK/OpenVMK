// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomElementControl / _EventProc

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _EventProc(_me: LingoMe, _this: LingoValue, a_kEvt: LingoValue, a_sElm: LingoValue, a_vPrm: LingoValue, a_sWnd: LingoValue) {
  if (callNamed("voidp", meProp(_me, "m_rSelected"))) {
  callMethod("hide", meProp(_me, "m_rControls"))
  } else {
  if (lingoBinary("or", (lingoTruthy(callNamed("objectp", callMethod("GetFactor", meProp(_me, "m_rSelected")))) ? 0 : 1), (lingoTruthy(callNamed("objectp", callMethod("GetVisual", meProp(_me, "m_rSelected")))) ? 0 : 1))) {
  callMethod("hide", meProp(_me, "m_rControls"))
  return callNamed("error", _this, "Object was invalidated by server!", symbol("_EventProc"));
  }

  switch (a_sElm) {
case "place.move.button":
  if (callMethod("CanBeMoved", callMethod("GetFactor", meProp(_me, "m_rSelected")))) {
  switch (callMethod("GetParam", meProp(_me, "m_rSelected"), "CLASS")) {
case "element":
  callNamed("executeMessage", "move_element_start", meProp(_me, "m_rSelected"))
  callNamed("registerMessage", "move_element_end", callMethod("getID", _this), symbol("PlaceElementCbk"))
  callNamed("registerMessage", "move_element_failed", callMethod("getID", _this), symbol("PlaceElementCbk"))
  callMethod("hide", meProp(_me, "m_rControls"))
  break;
case "poster":
  callNamed("executeMessage", "move_poster_start", meProp(_me, "m_rSelected"))
  callNamed("registerMessage", "move_poster_end", callMethod("getID", _this), symbol("PlacePosterCbk"))
  callNamed("registerMessage", "move_poster_failed", callMethod("getID", _this), symbol("PlacePosterCbk"))
  callMethod("hide", meProp(_me, "m_rControls"))
  break;
  default:
  callNamed("error", _this, lingoBinary("joinPad", "Unknown object type can't be moved:", callMethod("GetParam", meProp(_me, "m_rSelected"), "CLASS")), symbol("_EventProc"))
  }

  }

  break;
case "place.rotate.button":
  callMethod("send", callNamed("getConnection", "VMK"), "RotateItem", new LingoPropList([symbol("int"), callNamed("integer", callMethod("GetParam", meProp(_me, "m_rSelected"), "REF"))]))
  break;
case "place.takeaway.button":
  var t_sType = callMethod("GetParam", meProp(_me, "m_rSelected"), "TYPE");
  if (lingoBinary("eq", t_sType, "3008")) {
  callMethod("send", callNamed("getConnection", "VMK"), 765, new LingoPropList([symbol("int"), callNamed("integer", callMethod("GetParam", meProp(_me, "m_rSelected"), "REF"))]))
  } else {
  callMethod("send", callNamed("getConnection", "VMK"), "PickItem", new LingoPropList([symbol("int"), callNamed("integer", callMethod("GetParam", meProp(_me, "m_rSelected"), "REF"))]))
  }

  callMethod("Unselect", _this)
  break;
case "place.iteminfo.button":
  callMethod("send", callNamed("getConnection", "VMK"), "RequestItemDetails", new LingoPropList([symbol("int"), callMethod("get", callNamed("getObject", symbol("session")), "room_own_avatar"), symbol("int"), 3, symbol("int"), callNamed("integer", callMethod("GetParam", meProp(_me, "m_rSelected"), "REF"))]))
  break;
case "place.vmks.button":
  if (callNamed("variableExists", "rpgfurnipopup.url")) {
  if (callNamed("voidp", callMethod("GetParam", meProp(_me, "m_rSelected"), "ENTITYID"))) {
  callMethod("set", callNamed("getObject", symbol("session")), "FetchEntityID", 1)
  callNamed("registerListener", callNamed("getVariable", "main.connection.id", "VMK"), callMethod("getID", _this), new LingoPropList([2522, symbol("GotoRPGWebPage")]))
  callMethod("send", callNamed("getConnection", "VMK"), "RequestItemDetails", new LingoPropList([symbol("int"), callMethod("get", callNamed("getObject", symbol("session")), "room_own_avatar"), symbol("int"), 3, symbol("int"), callNamed("integer", callMethod("GetParam", meProp(_me, "m_rSelected"), "REF"))]))
  } else {
  callMethod("GotoRPGWebPage", _this)
  }

  }

  break;
case "place.state.button":
  callMethod("send", callNamed("getConnection", "VMK"), "ToggleItem", new LingoPropList([symbol("int"), callNamed("integer", callMethod("GetParam", meProp(_me, "m_rSelected"), "REF"))]))
  break;
case "close":
  callMethod("Unselect", _this)
  break;
  }

  }

}

