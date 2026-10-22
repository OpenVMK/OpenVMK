// vmk_pirates2_minigame.cct / CPiratesSound / playMusic

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function playMusic(_me: LingoMe, a_sMusic: LingoValue) {
  var t_bMusic = callMethod("get", callNamed("getObject", symbol("session")), "music");
  if (t_bMusic) {
  callMethod("stop", meProp(_me, "m_rMusic"))
  callMethod("setPlayList", meProp(_me, "m_rMusic"), new LingoList([new LingoPropList([symbol("member"), callNamed("member", callNamed("getmemnum", a_sMusic)), symbol("loopCount"), 1])]))
  callMethod("play", meProp(_me, "m_rMusic"))
  }

}

