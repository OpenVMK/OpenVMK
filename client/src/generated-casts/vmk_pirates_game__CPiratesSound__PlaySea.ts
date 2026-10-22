// vmk_pirates_game.cct / CPiratesSound / PlaySea

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PlaySea(_me: LingoMe) {
  var t_bMusic = callMethod("get", callNamed("getObject", symbol("session")), "fx");
  if (t_bMusic) {
  callMethod("stop", meProp(_me, "m_rSea"))
  callMethod("setPlayList", meProp(_me, "m_rSea"), new LingoList([new LingoPropList([symbol("member"), callNamed("member", callNamed("getmemnum", "PG-sea-mono-loop"))])]))
  callMethod("play", meProp(_me, "m_rSea"))
  }

}

