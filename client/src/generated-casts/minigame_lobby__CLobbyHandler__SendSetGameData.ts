// minigame_lobby.cct / CLobbyHandler / SendSetGameData

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SendSetGameData(_me: LingoMe, i_iRef: LingoValue, a_mp_keypairs: LingoValue) {
  var tMsg = new LingoPropList([symbol("int"), i_iRef, symbol("int"), a_mp_keypairs.count]);
  for (var i = 1; i <= a_mp_keypairs.count; ++i) {
  var tKey = callMethod("getPropAt", a_mp_keypairs, i);
  var tvalue = callMethod("getaProp", a_mp_keypairs, tKey);
  callMethod("addProp", tMsg, symbol("str"), callNamed("string", tKey))
  callMethod("addProp", tMsg, symbol("str"), callNamed("string", tvalue))
  }

  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), 644, tMsg)
}

