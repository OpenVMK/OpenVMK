// vmk_junglecruise_minigame.cct / CJungleCruiseVisualizerPowerup / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe) {
  var tPos = callMethod("GetScrPos", callMethod("getObject", _me));
  var ttype = callMethod("GetParam", callMethod("getObject", _me), "Type");
  switch (ttype) {
case symbol("fuel"):
  setThePropOf(meProp(_me, "m_rSprite"), "member", callNamed("getMember", "gasoline_pickup"));
  setThePropOf(meProp(_me, "m_rSprite"), "width", meProp(_me, "m_rSprite").member.width);
  setThePropOf(meProp(_me, "m_rSprite"), "height", meProp(_me, "m_rSprite").member.height);
  break;
case symbol("film"):
  setThePropOf(meProp(_me, "m_rSprite"), "member", callNamed("getMember", "film_pickup"));
  setThePropOf(meProp(_me, "m_rSprite"), "width", meProp(_me, "m_rSprite").member.width);
  setThePropOf(meProp(_me, "m_rSprite"), "height", meProp(_me, "m_rSprite").member.height);
  break;
  }

  var t_veScr = callMethod("GetScrPos", callMethod("getObject", _me));
  if (lingoBinary("neq", meProp(_me, "m_veLastScr"), t_veScr)) {
  var t_fXs = t_veScr.x;
  var t_fYs = t_veScr.y;
  var t_fZs = t_veScr.z;
  setThePropOf(meProp(_me, "m_rSprite"), "locH", t_fXs);
  setThePropOf(meProp(_me, "m_rSprite"), "locV", t_fYs);
  setThePropOf(meProp(_me, "m_rSprite"), "locZ", t_fZs);
  setMeProp(_me, "m_veLastScr", t_veScr);
  }

}

