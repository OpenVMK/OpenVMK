// c7d81c175a2637e0193f0cf7bfd014ba.cct / CGiftInterface / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_rWindow", undefined);
  callNamed("registerMessage", symbol("room_leave"), callMethod("getID", _me), symbol("leaveRoom"))
  setMeProp(_me, "m_rGridLoadAnim", callNamed("createObject", callNamed("getUniqueID"), "CMainThumbGridAnimator"));
  setMeProp(_me, "m_mp_sUrl_rMember", new LingoPropList([]));
  setMeProp(_me, "m_pComposeMessage", undefined);
  setMeProp(_me, "m_rMessageHd", undefined);
  setMeProp(_me, "m_pRadioButtons", undefined);
  setMeProp(_me, "m_bLoadingImage", 0);
}

