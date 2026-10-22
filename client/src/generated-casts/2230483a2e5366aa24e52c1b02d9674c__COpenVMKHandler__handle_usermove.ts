// 2230483a2e5366aa24e52c1b02d9674c.cct / COpenVMKHandler / handle_usermove

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function handle_usermove(_me: LingoMe, _this: LingoValue, a_rMsg: LingoValue) {
  /* global */ var g_rCore = globalVar("g_rCore");
  var t_rContext = callMethod("_AccessRoom", callNamed("getObject", symbol("room_component")));
  if (callNamed("voidp", t_rContext)) {
  callNamed("error", _this, "Room context not available!", symbol("_LocateAvatar"))
  } else {
  var t_iAvatar = callMethod("GetIntFrom", a_rMsg.connection);
  var t_rAvatar = callMethod("_AccessIndexed", t_rContext, t_iAvatar, "avatar");
  var t_iTile = callMethod("GetIntFrom", a_rMsg.connection);
  var t_rTile = callMethod("_AccessIndexed", t_rContext, t_iTile, "tile");
  var t_bIsWalking = callMethod("GetIntFrom", a_rMsg.connection);
  var t_iStack = callMethod("GetIntFrom", a_rMsg.connection);
  if (lingoBinary("eq", callMethod("GetIntFrom", a_rMsg.connection), 1)) {
  var Actions = callMethod("GetVisual", t_rAvatar).m_rRenderer.m_mp_AvatarData;
  }

  if (t_bIsWalking) {
  callMethod("WalkToTile", callMethod("GetFactor", t_rAvatar), t_rTile, t_iStack)
  } else {
  callMethod("SetToTileStack", callMethod("GetFactor", t_rAvatar), t_rTile, t_iStack)
  }

  }

}

