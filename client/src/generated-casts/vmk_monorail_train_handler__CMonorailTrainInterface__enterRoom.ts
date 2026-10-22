// vmk_monorail_train_handler.cct / CMonorailTrainInterface / enterRoom

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function enterRoom(_me: LingoMe) {
  var t_bOn = callMethod("get", callNamed("getObject", symbol("session")), "fx");
  if (lingoBinary("and", lingoBinary("and", lingoBinary("eq", callNamed("getIntVariable", "MonorailState"), 1), t_bOn), meProp(_me, "m_bAllowMusic"))) {
  callMethod("StopSound", meProp(_me, "m_rSndFX"))
  callMethod("Define", meProp(_me, "m_rSndFX"), "MR-monorail-VO-mono")
  callMethod("PlaySound", meProp(_me, "m_rSndFX"))
  }

  var tRoomContext = callMethod("_AccessRoom", callMethod("getComponent", callNamed("getThread", symbol("room"))));
  setMeProp(_me, "m_pLCD", callMethod("Search", tRoomContext, "NAME", "lcd"));
  if (lingoBinary("eq", meProp(_me, "m_pTextScroller"), 0)) {
  setMeProp(_me, "m_pTextScroller", callMethod("initTextScroller", _me));
  }

  if (lingoBinary("eq", meProp(_me, "m_pTextScrollerHolder"), 0)) {
  setMeProp(_me, "m_pTextScrollerHolder", callMethod("initTextScrollerHolder", _me));
  }

  callMethod("LoadAnim", _me)
  setMeProp(_me, "m_pStarField", callMethod("initStarField", _me));
  var t_iState = callNamed("getIntVariable", "MonorailState");
  if (lingoBinary("or", lingoBinary("eq", t_iState, 1), lingoBinary("eq", t_iState, 0))) {
  callMethod("OpenDoors", _me)
  }

  callMethod("setNode", meProp(_me, "m_rOscillator"), meProp(_me, "m_pLCD"))
  setMeProp(_me, "m_bAllowMusic", 1);
}

