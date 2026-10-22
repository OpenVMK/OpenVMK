// 6df220c58a1fbfc6fa5eee1823840b41.cct / CRoomInfoInterface / GetEntryStateDescription

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetEntryStateDescription(_me: LingoMe, _this: LingoValue, a_iState: LingoValue) {
  switch (a_iState) {
case 0:
  return callNamed("getText", "everyone.entrystate");
case 1:
  return callNamed("getText", "friendsonly.entrystate");
case 2:
  return callNamed("getText", "ticketpeople.entrystate");
case 3:
  return callNamed("getText", "almosteveryone.entrystate");
case 4:
  return callNamed("getText", "owner.entrystate");
  }

  return "";
}

