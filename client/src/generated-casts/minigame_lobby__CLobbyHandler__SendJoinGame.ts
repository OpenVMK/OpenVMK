// minigame_lobby.cct / CLobbyHandler / SendJoinGame

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SendJoinGame(_me: LingoMe, i_iRef: LingoValue, i_iTeam: LingoValue, a_mp_keypairs: LingoValue) {
  if ((lingoTruthy(callNamed("listp", a_mp_keypairs)) ? 0 : 1)) {
  a_mp_keypairs = new LingoPropList([]);
  }

  var tMsg = new LingoPropList([symbol("int"), i_iRef, symbol("int"), i_iTeam, symbol("int"), a_mp_keypairs.count]);
  for (var i = 1; i <= a_mp_keypairs.count; ++i) {
  var tKey = callMethod("getPropAt", a_mp_keypairs, i);
  var tvalue = callMethod("getaProp", a_mp_keypairs, tKey);
  callMethod("addProp", tMsg, symbol("str"), callNamed("string", tKey))
  callMethod("addProp", tMsg, symbol("str"), callNamed("string", tvalue))
  }

  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), 645, tMsg)
}

