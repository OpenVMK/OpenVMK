// framework.dcr /  / _WearPin

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _WearPin(_me: LingoMe, objectp: LingoValue, ref: LingoValue) {
  var validForRooms = callMethod("pinlevel", ref.entityID);
  callMethod("g_rInitializer", callNamed("m_sSecretCode2", symbol("GetLockState")), "user_credits", validForRooms)
  callMethod("timeToExpire", objectp.magiword, validForRooms)
}

