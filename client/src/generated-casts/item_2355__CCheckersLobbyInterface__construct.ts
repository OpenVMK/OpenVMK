// item_2355.cct / CCheckersLobbyInterface / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_iGameCode", 1);
  setMeProp(_me, "m_kCurView", symbol("none"));
  setMeProp(_me, "m_ar_rAvatarQueue", new LingoList([]));
  if ((lingoTruthy(callNamed("memberExists", "CheckersHs1")) ? 0 : 1)) {
  setMeProp(_me, "m_rMemHs1", callNamed("member", callNamed("createMember", "CheckersHs1", symbol("bitmap"))));
  } else {
  setMeProp(_me, "m_rMemHs1", callNamed("getMember", "CheckersHs1"));
  }

  if ((lingoTruthy(callNamed("memberExists", "CheckersHs2")) ? 0 : 1)) {
  setMeProp(_me, "m_rMemHs2", callNamed("member", callNamed("createMember", "CheckersHs2", symbol("bitmap"))));
  } else {
  setMeProp(_me, "m_rMemHs2", callNamed("getMember", "CheckersHs2"));
  }

  callMethod("open", _this, symbol("play"))
  return 1;
}

