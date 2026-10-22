// 2230483a2e5366aa24e52c1b02d9674c.cct /  / handle_updatesingle

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function handle_updatesingle(_me: LingoMe, tMsg: LingoValue) {
  /* global */ var g_rCore = globalVar("g_rCore");
  var tAvatar = callMethod("GetIntFrom", tMsg.connection);
  var tID = callMethod("GetIntFrom", tMsg.connection);
  var tdata = callMethod("GetIntFrom", tMsg.connection);
  var t_rContext = callMethod("_AccessRoom", callNamed("getObject", symbol("room_component")));
  if (callNamed("objectp", t_rContext)) {
  var t_rAvatar = callMethod("_AccessIndexed", t_rContext, tAvatar, "avatar");
  if (callNamed("objectp", t_rAvatar)) {
  var t_aActions = callMethod("GetVisual", t_rAvatar).m_rRenderer.m_mp_AvatarData;
  if (callNamed("listp", t_aActions)) {
  t_aActions[tID] = tdata;
  callMethod("Actions", callMethod("GetVisual", t_rAvatar), t_aActions)
  } else {
  callNamed("error", _me, "Action list missing", symbol("_UpdateSingle"))
  }

  } else {
  callNamed("error", _me, "Avatar not available", symbol("_UpdateSingle"))
  }

  } else {
  callNamed("error", _me, "Room context not available!", symbol("_UpdateSingle"))
  }

}

