// vmk_fireworks.cct / CFireworksGameInterface / PlaceSelector

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PlaceSelector(_me: LingoMe) {
  if ((lingoTruthy(meProp(_me, "m_bControlsLocked")) ? 0 : 1)) {
  var t_iSelectorIndex = meProp(_me, "m_iCurrentSelection");
  var tloc = callMethod("getProperty", callMethod("getElement", callNamed("getWindow", "fwselector"), "fw.type.selectarea"), symbol("sprite")).loc;
  tloc = lingoBinary("add", tloc, callNamed("point", lingoBinary("add", lingoBinary("mul", lingoBinary("sub", t_iSelectorIndex, 1), meProp(_me, "m_iIconSpacing")), lingoBinary("mul", lingoBinary("div", lingoBinary("sub", 8, meProp(_me, "m_ar_mp_selector").count), 2), meProp(_me, "m_iIconSpacing"))), 0));
  setThePropOf(meProp(_me, "m_rSelectorSprite"), "loc", tloc);
  setThePropOf(meProp(_me, "m_rSelectorSprite"), "locZ", 10000);
  setThePropOf(meProp(_me, "m_rSelectorSprite"), "ink", 36);
  setThePropOf(meProp(_me, "m_rSelectorSprite"), "member", callNamed("member", "fw.selector"));
  setThePropOf(meProp(_me, "m_rSelectorSprite"), "width", meProp(_me, "m_rSelectorSprite").member.image.width);
  setThePropOf(meProp(_me, "m_rSelectorSprite"), "height", meProp(_me, "m_rSelectorSprite").member.image.height);
  }

  setThePropOf(meProp(_me, "m_ar_sprGraphicCursor")[2], "member", meProp(_me, "m_ar_memberAimCursor")[meProp(_me, "m_iCurrentSelection")]);
  setThePropOf(meProp(_me, "m_ar_sprGraphicCursor")[2], "width", meProp(_me, "m_ar_sprGraphicCursor")[2].member.image.width);
  setThePropOf(meProp(_me, "m_ar_sprGraphicCursor")[2], "height", meProp(_me, "m_ar_sprGraphicCursor")[2].member.image.height);
}

