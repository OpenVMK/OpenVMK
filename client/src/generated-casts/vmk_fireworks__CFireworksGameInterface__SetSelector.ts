// vmk_fireworks.cct / CFireworksGameInterface / SetSelector

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetSelector(_me: LingoMe, a_ar_mp_selector: LingoValue) {
  if (lingoBinary("gt", meProp(_me, "m_ar_mp_selector").count, 0)) {
  callMethod("FreeSelector", _me)
  }

  var tWnd = callNamed("getWindow", "fwselector");
  setThePropOf(callMethod("getProperty", callMethod("getElement", tWnd, "fw.type.selectarea"), symbol("sprite")), "locZ", -float(50000000));
  var tSelAreaLoc = callMethod("getProperty", callMethod("getElement", tWnd, "fw.type.selectarea"), symbol("sprite")).loc;
  setMeProp(_me, "m_ar_mp_selector", callMethod("duplicate", a_ar_mp_selector));
  callMethod("flush", meProp(_me, "m_ar_selectorLocations"))
  var i = 0;
  for (var tSelection of meProp(_me, "m_ar_mp_selector").toArray()) {
  callMethod("setaProp", tSelection, symbol("sprite"), callNamed("sprite", callNamed("reserveSprite", callMethod("getID", _me))))
  setThePropOf(tSelection.sprite, "member", callNamed("member", lingoBinary("join", lingoBinary("join", "fw.type", tSelection._type), ".select")));
  setThePropOf(tSelection.sprite, "loc", callNamed("point", lingoBinary("add", lingoBinary("add", tSelAreaLoc.locH, lingoBinary("mul", i, meProp(_me, "m_iIconSpacing"))), lingoBinary("mul", lingoBinary("div", lingoBinary("sub", 8, meProp(_me, "m_ar_mp_selector").count), 2), meProp(_me, "m_iIconSpacing"))), tSelAreaLoc.locV));
  setThePropOf(tSelection.sprite, "locZ", 5000);
  setThePropOf(tSelection.sprite, "width", tSelection.sprite.member.image.width);
  setThePropOf(tSelection.sprite, "height", tSelection.sprite.member.image.height);
  i = lingoBinary("add", i, 1);
  meProp(_me, "m_ar_memberAimCursor")[i] = callNamed("member", lingoBinary("join", lingoBinary("join", "fw.type", tSelection._type), ".aim"));
  callMethod("push", meProp(_me, "m_ar_selectorLocations"), tSelection.sprite.loc)
  }

  if (meProp(_me, "m_bControlsLocked")) {
  setMeProp(_me, "m_iCurrentSelection", callNamed("integer", lingoBinary("div", meProp(_me, "m_ar_mp_selector").count, float(2))));
  } else {
  setMeProp(_me, "m_iCurrentSelection", 1);
  }

  setMeProp(_me, "m_sCurrentSelection", meProp(_me, "m_ar_mp_selector")[meProp(_me, "m_iCurrentSelection")].name);
  var t_iSelectorIndex = meProp(_me, "m_iCurrentSelection");
  var tloc = callMethod("getProperty", callMethod("getElement", callNamed("getWindow", "fwselector"), "fw.type.selectarea"), symbol("sprite")).loc;
  tloc = lingoBinary("add", tloc, callNamed("point", lingoBinary("add", lingoBinary("mul", lingoBinary("sub", t_iSelectorIndex, 1), meProp(_me, "m_iIconSpacing")), lingoBinary("mul", lingoBinary("div", lingoBinary("sub", 8, meProp(_me, "m_ar_mp_selector").count), 2), meProp(_me, "m_iIconSpacing"))), 0));
  setThePropOf(meProp(_me, "m_rSelectorSprite"), "loc", tloc);
  setThePropOf(meProp(_me, "m_rSelectorSprite"), "locZ", 10000);
  setThePropOf(meProp(_me, "m_rSelectorSprite"), "ink", 36);
  setThePropOf(meProp(_me, "m_rSelectorSprite"), "member", callNamed("member", "fw.selector"));
  setThePropOf(meProp(_me, "m_rSelectorSprite"), "width", meProp(_me, "m_rSelectorSprite").member.image.width);
  setThePropOf(meProp(_me, "m_rSelectorSprite"), "height", meProp(_me, "m_rSelectorSprite").member.image.height);
  callMethod("PlaceSelector", _me)
}

