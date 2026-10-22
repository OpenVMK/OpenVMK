// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomHandler / _LocateAvatar

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _LocateAvatar(_me: LingoMe, _this: LingoValue, a_rMsg: LingoValue) {
  var t_rContext = callMethod("_AccessRoom", callMethod("getComponent", _this));
  if (callNamed("voidp", t_rContext)) {
  callNamed("error", _this, "Room context not available!", symbol("_LocateAvatar"))
  } else {
  var t_iAvatar = callMethod("GetIntFrom", a_rMsg.connection);
  var t_rAvatar = callMethod("_AccessIndexed", t_rContext, t_iAvatar, "avatar");
  var t_iTile = callMethod("GetIntFrom", a_rMsg.connection);
  var t_rTile = callMethod("_AccessIndexed", t_rContext, t_iTile, "tile");
  var t_iStack = callMethod("GetIntFrom", a_rMsg.connection);
  var t_iheadDir = callMethod("GetIntFrom", a_rMsg.connection);
  var t_iBodyDir = callMethod("GetIntFrom", a_rMsg.connection);
  switch (1) {
case callNamed("voidp", t_rAvatar):
  callNamed("error", _this, lingoBinary("joinPad", "Avatar not found:", t_iAvatar), symbol("_LocateAvatar"))
  break;
case callNamed("voidp", t_rTile):
  callNamed("error", _this, lingoBinary("joinPad", "Tile not found:", t_iTile), symbol("_LocateAvatar"))
  break;
  default:
  if ((lingoTruthy(callMethod("SetToTileStack", callMethod("GetFactor", t_rAvatar), t_rTile, t_iStack)) ? 0 : 1)) {
  callNamed("error", _this, "Failed to set avatar into a tile!", symbol("_LocateAvatar"))
  } else {
  if ((lingoTruthy(callMethod("GetAvatarOnTile", callMethod("GetVisual", t_rAvatar))) ? 0 : 1)) {
  callMethod("SetAvatarOnTile", callMethod("GetVisual", t_rAvatar), 1)
  var t_rRenderer = callMethod("GetRenderer", callMethod("GetVisual", t_rAvatar));
  callMethod("Refresh", t_rRenderer, t_iheadDir, t_iBodyDir)
  callMethod("visible", callMethod("GetVisual", t_rAvatar), 1, 1)
  }

  }

  }

  }

}

