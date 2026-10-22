// minigame_lobby.cct / CLobbyHandler / HandleGameConditions

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function HandleGameConditions(_me: LingoMe, tMsg: LingoValue) {
  var tKeyPairCount = callMethod("GetIntFrom", tMsg.connection);
  var t_ar_keypairs = new LingoPropList([]);
  for (var i = 1; i <= tKeyPairCount; ++i) {
  var t_sKey = callMethod("GetStrFrom", tMsg.connection);
  var t_sValue = callMethod("GetStrFrom", tMsg.connection);
  t_ar_keypairs[t_sKey] = t_sValue;
  }

  callMethod("SetGameConditions", callMethod("getComponent", _me), t_ar_keypairs)
}

