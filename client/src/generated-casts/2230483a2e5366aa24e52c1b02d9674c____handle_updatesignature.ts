// 2230483a2e5366aa24e52c1b02d9674c.cct /  / handle_updatesignature

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function handle_updatesignature(_me: LingoMe, tMsg: LingoValue) {
  /* global */ var g_rCore = globalVar("g_rCore");
  var t_iRef = callMethod("GetIntFrom", tMsg.connection);
  var t_sMission = callMethod("GetStrFrom", tMsg.connection);
  var t_rContext = callMethod("_AccessRoom", callNamed("getObject", symbol("room_component")));
  if (callNamed("objectp", t_rContext)) {
  var t_rUser = callMethod("_AccessIndexed", t_rContext, t_iRef, "avatar");
  if (callNamed("objectp", t_rUser)) {
  callMethod("SetParam", t_rUser, "DESC", t_sMission)
  }

  }

}

