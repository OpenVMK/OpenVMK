// 0b6ee19273580ef7ae01b42744cca0a6.cct / CMessengerComponent / AvatarInfo

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function AvatarInfo(_me: LingoMe, a_iUserID: LingoValue, a_sUserName: LingoValue) {
  callMethod("append", meProp(_me, "m_ar_avatars"), new LingoPropList([symbol("userID"), a_iUserID, symbol("buddyname"), a_sUserName]))
}

