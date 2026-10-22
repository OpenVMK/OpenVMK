// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomHandler / _StatusPulse

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _StatusPulse(_me: LingoMe, _this: LingoValue, a_rMsg: LingoValue) {
  var t_iCount = callMethod("GetIntFrom", a_rMsg.connection);
  var t_rContext = callMethod("_AccessRoom", callMethod("getComponent", _this));
  var t_rInput = a_rMsg.connection;
  if (callNamed("objectp", t_rContext)) {
  for (var i = 1; i <= t_iCount; ++i) {
  var t_iRef = callMethod("GetIntFrom", t_rInput);
  var t_iTile = callMethod("GetIntFrom", t_rInput);
  var t_iStack = callMethod("GetIntFrom", t_rInput);
  var t_ar_iActions = new LingoList([]);
  for (var j = 1; j <= 12; ++j) {
  callMethod("add", t_ar_iActions, callMethod("GetIntFrom", t_rInput))
  }

  var t_sTradeState = callNamed("string", t_ar_iActions[9]);
  var t_sFriendRequest = callNamed("string", t_ar_iActions[12]);
  var t_rObj = callMethod("_AccessIndexed", t_rContext, t_iRef, "avatar");
  callMethod("SetParam", t_rObj, "TRADE", t_sTradeState)
  callMethod("SetParam", t_rObj, "FRIEND", t_sFriendRequest)
  var t_rTile = callMethod("_AccessIndexed", t_rContext, t_iTile, "tile");
  if (callNamed("voidp", t_rTile)) {
  callNamed("error", _this, lingoBinary("joinPad", "Tile not found:", t_iTile), symbol("_SatusPulse"))
  continue;
  }

  var t_rAvatar = callMethod("_AccessIndexed", t_rContext, t_iRef, "avatar");
  if (callNamed("objectp", t_rAvatar)) {
  callMethod("WalkToTile", callMethod("GetFactor", t_rAvatar), t_rTile, t_iStack)
  callMethod("Actions", callMethod("GetVisual", t_rAvatar), t_ar_iActions)
  if ((lingoTruthy(callMethod("GetAvatarOnTile", callMethod("GetVisual", t_rAvatar))) ? 0 : 1)) {
  callMethod("SetAvatarOnTile", callMethod("GetVisual", t_rAvatar), 1)
  callMethod("visible", callMethod("GetVisual", t_rAvatar), 1, 1)
  }

  continue;
  }

  callNamed("error", _this, lingoBinary("joinPad", "Avatar with given index not found:", t_iRef), symbol("_StatusPulse"))
  }

  }

}

