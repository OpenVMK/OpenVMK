// vmk_tutorial.cct / CScoreFeedback / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_iBlend", 0);
  setMeProp(_me, "m_iCounter", 100);
  setMeProp(_me, "m_bActive", 1);
  setMeProp(_me, "m_rSprite", callNamed("sprite", callNamed("reserveSprite", callMethod("getID", _me))));
  setMeProp(_me, "m_ar_members", new LingoList([]));
  var t_ar_memnames = new LingoList(["hit.oops", "hit.ok", "hit.good", "hit.flawless", "hit.awesome"]);
  for (var tName of t_ar_memnames.toArray()) {
  callMethod("append", meProp(_me, "m_ar_members"), callNamed("getMember", tName))
  }

  callNamed("receiveUpdate", callMethod("getID", _me))
  return 1;
}

