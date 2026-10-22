// vmk_domestic.cct / CRoomMouseEventProcessor2 / Process

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Process(_me: LingoMe, _this: LingoValue, a_kEvent: LingoValue, a_sKey: LingoValue) {
  callNamed("trace", a_sKey, a_kEvent)
  var t_rUnknown = callMethod("GetObjByKey", callMethod("_AccessRoom", callNamed("getThread", symbol("room")).component), a_sKey);
  if (lingoBinary("eq", callMethod("GetParam", t_rUnknown, "CLASS"), "avatar")) {
  if (lingoBinary("or", lingoBinary("eq", a_kEvent, symbol("mouseEnter")), lingoBinary("eq", a_kEvent, symbol("mouseLeave")))) {
  callMethod("ShowAvatarName", callMethod("GetVisual", t_rUnknown), a_kEvent)
  }

  }

  if (lingoBinary("eq", a_kEvent, symbol("mouseDown"))) {
  if (callNamed("objectExists", "RoomObjectPlacer")) {
  if ((lingoTruthy(callNamed("voidp", callMethod("getMovable", callNamed("getObject", "RoomObjectPlacer")))) ? 0 : 1)) {
  return 1;
  }

  }

  var t_rSelected = callMethod("GetObjByKey", callMethod("_AccessRoom", callNamed("getThread", symbol("room")).component), _this.m_sSelected);
  if (callNamed("objectp", t_rSelected)) {
  callMethod("Unselect", callMethod("GetFactor", t_rSelected))
  }

  setMeProp(_me, "m_sSelected", a_sKey);
  if (lingoBinary("eq", callMethod("GetParam", t_rUnknown, "CLASS"), "avatar")) {
  var t_bExists = callMethod("exists", callNamed("getObject", symbol("session")), "minigame");
  if (t_bExists) {
  var t_bState = callMethod("get", callNamed("getObject", symbol("session")), "minigame");
  } else {
  t_bState = 0;
  }

  if (lingoBinary("eq", t_bState, 0)) {
  callMethod("select", _this.m_rAvatarCtrl, t_rUnknown)
  callMethod("Unselect", _this.m_rElementCtrl)
  callMethod("select", callMethod("GetFactor", t_rUnknown))
  callNamed("executeMessage", "room_avatar_selection", t_rUnknown)
  return 1;
  } else {
  return 0;
  }

  } else {
  if (lingoBinary("eq", callMethod("GetParam", t_rUnknown, "CLASS"), "element")) {
  callMethod("select", _this.m_rElementCtrl, t_rUnknown)
  callMethod("SetButtonStates", _this.m_rElementCtrl, 1, 1, 1)
  callMethod("Unselect", _this.m_rAvatarCtrl)
  callMethod("select", callMethod("GetFactor", t_rUnknown))
  if ((lingoTruthy(callMethod("get", callNamed("getObject", symbol("session")), "room_furnish_mode")) ? 0 : 1)) {
  var t_rTile = callMethod("GetTheTileStack", callMethod("GetFactor", t_rUnknown));
  if (callNamed("objectp", t_rTile)) {
  callNamed("executeMessage", "room_tile_selection", t_rTile)
  }

  }

  return 1;
  } else {
  if (lingoBinary("eq", callMethod("GetParam", t_rUnknown, "CLASS"), "block")) {
  if (lingoBinary("and", lingoBinary("eq", callNamed("value", callMethod("GetParam", callMethod("getObject", t_rUnknown), "NOCLK")), 1), (lingoTruthy(callMethod("get", callNamed("getObject", symbol("session")), "room_furnish_mode")) ? 0 : 1))) {
  var tloc = callNamed("clickLoc");
  t_rTile = callNamed("GetTileAtScrPos", callNamed("vector", tloc.locH, tloc.locV, 0));
  if (callNamed("objectp", t_rTile)) {
  callNamed("executeMessage", "room_tile_selection", t_rTile)
  }

  return 0;
  }

  t_rTile = callMethod("GetTheTileStack", callMethod("GetFactor", t_rUnknown));
  if (callNamed("objectp", t_rTile)) {
  callNamed("executeMessage", "room_tile_selection", t_rTile)
  }

  if (callNamed("voidp", t_rTile)) {
  callNamed("error", _this, "Tile stack invalid.", symbol("Process"))
  callMethod("Unselect", _this.m_rElementCtrl)
  callMethod("Unselect", _this.m_rAvatarCtrl)
  return;
  }

  var t_rCopy = t_rTile;
  while (1) {
  if (lingoBinary("gt", callMethod("GetCount", t_rCopy), 0)) {
  t_rCopy = t_rCopy[1];
  var t_iStack = lingoBinary("add", t_iStack, 1);
  break;
  continue;
  }

  var t_rElement = callMethod("_AccessIndexed", callMethod("_AccessRoom", callNamed("getThread", symbol("room")).component), callNamed("integer", callMethod("GetParam", t_rCopy, "REF")), "element");
  }

  if (callNamed("voidp", t_rElement)) {
  callNamed("error", _this, "Invalid block found!", symbol("Process"))
  callMethod("Unselect", _this.m_rElementCtrl)
  callMethod("Unselect", _this.m_rAvatarCtrl)
  return;
  }

  if (callMethod("get", callNamed("getObject", symbol("session")), "ControlRoom")) {
  callMethod("select", _this.m_rElementCtrl, t_rElement)
  callMethod("SetButtonStates", _this.m_rElementCtrl, 1, 1, 1)
  } else {
  if (callNamed("value", callMethod("GetParam", callMethod("getObject", t_rElement), "GUESTMOVE"))) {
  callMethod("select", _this.m_rElementCtrl, t_rElement)
  } else {
  callMethod("Unselect", _this.m_rElementCtrl)
  callMethod("select", callMethod("GetVisual", t_rElement), 0)
  }

  }

  callMethod("Unselect", _this.m_rAvatarCtrl)
  callMethod("select", callMethod("GetFactor", t_rElement))
  setMeProp(_me, "m_sSelected", callMethod("GetKey", t_rElement));
  return 1;
  } else {
  if (lingoBinary("eq", callMethod("GetParam", t_rUnknown, "CLASS"), "poster")) {
  if (callMethod("get", callNamed("getObject", symbol("session")), "ControlRoom")) {
  callMethod("select", _this.m_rElementCtrl, t_rUnknown)
  callMethod("SetButtonStates", _this.m_rElementCtrl, 1, 0, 1)
  } else {
  if (callNamed("value", callMethod("GetParam", callMethod("getObject", t_rUnknown), "GUESTMOVE"))) {
  callMethod("select", _this.m_rElementCtrl, t_rUnknown)
  } else {
  callMethod("Unselect", _this.m_rElementCtrl)
  }

  }

  callMethod("Unselect", _this.m_rAvatarCtrl)
  callMethod("select", callMethod("GetFactor", t_rUnknown))
  return 1;
  } else {
  if (lingoBinary("eq", callMethod("GetParam", t_rUnknown, "CLASS"), "pointer")) {
  callMethod("select", callMethod("GetFactor", t_rUnknown))
  callMethod("Unselect", _this.m_rElementCtrl)
  callMethod("Unselect", _this.m_rAvatarCtrl)
  t_rTile = callMethod("GetTheTileStack", callMethod("GetFactor", t_rUnknown));
  if (callNamed("objectp", t_rTile)) {
  callNamed("executeMessage", "room_tile_selection", t_rTile)
  }

  return 1;
  } else {
  if (lingoBinary("eq", callMethod("GetParam", t_rUnknown, "CLASS"), "domestic")) {
  callNamed("trace", "WOO DOMESTIC")
  return 1;
  } else {
  callMethod("Unselect", _this.m_rElementCtrl)
  callMethod("Unselect", _this.m_rAvatarCtrl)
  return 0;
  }

  }

  }

  }

  }

  }

  }

}

