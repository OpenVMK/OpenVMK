// 2230483a2e5366aa24e52c1b02d9674c.cct /  / handle_move

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function handle_move(_me: LingoMe, tMsg: LingoValue) {
  /* global */ var g_rCore = globalVar("g_rCore");
  var t_iReference = callMethod("GetIntFrom", tMsg.connection);
  var t_iTile = callMethod("GetIntFrom", tMsg.connection);
  var t_iLast = callMethod("GetIntFrom", tMsg.connection);
  var t_iDirection = callMethod("GetIntFrom", tMsg.connection);
  var t_iStack = callMethod("GetIntFrom", tMsg.connection);
  var t_rContext = callMethod("_AccessRoom", callNamed("getObject", symbol("room_component")));
  var t_rAvatar = callMethod("_AccessIndexed", t_rContext, t_iReference, "avatar");
  if (callNamed("objectp", t_rAvatar)) {
  var t_aActions = callMethod("GetVisual", t_rAvatar).m_rRenderer.m_mp_AvatarData;
  if (lingoBinary("eq", t_iLast, 1)) {
  t_aActions[6] = 1;
  t_aActions[7] = 1;
  t_aActions[8] = 1;
  }

  t_aActions[1] = t_iDirection;
  t_aActions[2] = t_iDirection;
  callMethod("Actions", callMethod("GetVisual", t_rAvatar), t_aActions)
  callMethod("WalkToTile", callMethod("GetFactor", t_rAvatar), callMethod("_AccessIndexed", t_rContext, t_iTile, "tile"), t_iStack)
  }

}

