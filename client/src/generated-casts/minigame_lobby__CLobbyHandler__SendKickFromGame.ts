// minigame_lobby.cct / CLobbyHandler / SendKickFromGame

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SendKickFromGame(_me: LingoMe, i_iRef: LingoValue, i_iAvatarRef: LingoValue) {
  var tMsg = new LingoPropList([symbol("int"), i_iRef, symbol("int"), i_iAvatarRef]);
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), 647, tMsg)
}

