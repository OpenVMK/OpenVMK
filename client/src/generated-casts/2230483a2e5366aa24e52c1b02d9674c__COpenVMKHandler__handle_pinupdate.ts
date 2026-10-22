// 2230483a2e5366aa24e52c1b02d9674c.cct / COpenVMKHandler / handle_pinupdate

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function handle_pinupdate(_me: LingoMe, tMsg: LingoValue) {
  /* global */ var g_rCore = globalVar("g_rCore");
  var t_rContext = callMethod("_AccessRoom", callNamed("getObject", symbol("room_component")));
  var t_rAvatar = callMethod("_AccessIndexed", t_rContext, callMethod("GetIntFrom", tMsg.connection), "avatar");
  if (callNamed("objectp", t_rAvatar)) {
  var iBadgeCount = callMethod("GetIntFrom", tMsg.connection);
  for (var i = 1; i <= iBadgeCount; ++i) {
  callMethod("SetParam", t_rAvatar, lingoBinary("join", "icon.type.", i), callMethod("GetIntFrom", tMsg.connection))
  }

  var iPinCount = callMethod("GetIntFrom", tMsg.connection);
  for (var i = 1; i <= iPinCount; ++i) {
  callMethod("SetParam", t_rAvatar, lingoBinary("join", "pin.singleuse.", i), callMethod("GetIntFrom", tMsg.connection))
  callMethod("SetParam", t_rAvatar, lingoBinary("join", "pin.type.", i), callMethod("GetIntFrom", tMsg.connection))
  callMethod("SetParam", t_rAvatar, lingoBinary("join", "pin.level.", i), callMethod("GetIntFrom", tMsg.connection))
  }

  }

}

