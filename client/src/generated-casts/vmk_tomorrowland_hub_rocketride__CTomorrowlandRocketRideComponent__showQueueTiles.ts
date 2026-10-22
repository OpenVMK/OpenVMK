// vmk_tomorrowland_hub_rocketride.cct / CTomorrowlandRocketRideComponent / showQueueTiles

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function showQueueTiles(_me: LingoMe) {
  var tRoomContext = callMethod("_AccessRoom", callMethod("getComponent", callNamed("getThread", symbol("room"))));
  var t_rRoomItem = callMethod("Search", tRoomContext, "TYPE", "378");
  if ((lingoTruthy(callNamed("voidp", t_rRoomItem)) ? 0 : 1)) {
  var t_ar_sKeys = callMethod("GetFactor", t_rRoomItem).m_ar_sKey;
  for (var t = 1; t <= t_ar_sKeys.count; ++t) {
  var t_sKey = t_ar_sKeys[t];
  var t_rBlk = callMethod("GetObjByKey", callMethod("GetContext", callMethod("getObject", t_rRoomItem)), t_sKey);
  if (lingoBinary("or", lingoBinary("eq", t, 1), lingoBinary("eq", t, 4))) {
  callMethod("SetParam", t_rBlk, "ACT", "2")
  continue;
  }

  callMethod("SetParam", t_rBlk, "ACT", "0")
  }

  }

}

