// eba88a10adbb7784498c2112110c5871.cct / CThemedGuestRoomNavigator / GetSelectedRoomID

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetSelectedRoomID(_me: LingoMe) {
  if (lingoBinary("gt", meProp(_me, "m_selectedRoomData").count, 0)) {
  return meProp(_me, "m_selectedRoomData")["ID"];
  }

  return -float(1);
}

