// vmk_pirates2_minigame.cct / CFloatingTextFactory / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe) {
  var t_ar_newFloats = new LingoList([]);
  for (var tSpr of meProp(_me, "m_ar_rSprFloats").toArray()) {
  setThePropOf(tSpr, "loc", callNamed("point", tSpr.loc.locH, lingoBinary("sub", tSpr.loc.locV, meProp(_me, "m_iFloatSpeed"))));
  if (lingoBinary("gt", lingoBinary("sub", tSpr.blend, meProp(_me, "m_iFloatFade")), 0)) {
  callMethod("append", t_ar_newFloats, tSpr)
  setThePropOf(tSpr, "blend", lingoBinary("sub", tSpr.blend, meProp(_me, "m_iFloatFade")));
  continue;
  }

  callNamed("removeMember", tSpr.member.name)
  callNamed("releaseSprite", tSpr.spriteNum)
  }

  setMeProp(_me, "m_ar_rSprFloats", t_ar_newFloats);
}

