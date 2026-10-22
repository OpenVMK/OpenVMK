// vmk_tutorial.cct / CGameCamera / render

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function render(_me: LingoMe) {
  setThePropOf(meProp(_me, "m_rSprBase"), "member", meProp(_me, "m_memViewFinder"));
  var tloc = theProperty("mouseLoc");
  if (lingoBinary("lt", tloc.locH, lingoBinary("add", meProp(_me, "m_constraints").left, lingoBinary("div", meProp(_me, "m_rSprBase").width, 2)))) {
  setThePropOf(tloc, "locH", lingoBinary("add", meProp(_me, "m_constraints").left, lingoBinary("div", meProp(_me, "m_rSprBase").width, 2)));
  }

  if (lingoBinary("gt", tloc.locH, lingoBinary("sub", meProp(_me, "m_constraints").right, lingoBinary("div", meProp(_me, "m_rSprBase").width, 2)))) {
  setThePropOf(tloc, "locH", lingoBinary("sub", meProp(_me, "m_constraints").right, lingoBinary("div", meProp(_me, "m_rSprBase").width, 2)));
  }

  if (lingoBinary("lt", tloc.locV, lingoBinary("add", meProp(_me, "m_constraints").top, lingoBinary("div", meProp(_me, "m_rSprBase").height, 2)))) {
  setThePropOf(tloc, "locV", lingoBinary("add", meProp(_me, "m_constraints").top, lingoBinary("div", meProp(_me, "m_rSprBase").height, 2)));
  }

  if (lingoBinary("gt", tloc.locV, lingoBinary("sub", meProp(_me, "m_constraints").bottom, lingoBinary("div", meProp(_me, "m_rSprBase").height, 2)))) {
  setThePropOf(tloc, "locV", lingoBinary("sub", meProp(_me, "m_constraints").bottom, lingoBinary("div", meProp(_me, "m_rSprBase").height, 2)));
  }

  if (meProp(_me, "m_bLock")) {
  setThePropOf(meProp(_me, "m_rSprLock"), "member", meProp(_me, "m_memLock"));
  } else {
  setThePropOf(meProp(_me, "m_rSprLock"), "member", undefined);
  }

  if (callMethod("ready", _me)) {
  setThePropOf(meProp(_me, "m_rSprLED"), "member", meProp(_me, "m_memGreenLED"));
  } else {
  setThePropOf(meProp(_me, "m_rSprLED"), "member", meProp(_me, "m_memRedLED"));
  }

  setThePropOf(meProp(_me, "m_rSprBase"), "loc", tloc);
  setThePropOf(meProp(_me, "m_rSprBase"), "locZ", 5000);
  setThePropOf(meProp(_me, "m_rSprLock"), "loc", tloc);
  setThePropOf(meProp(_me, "m_rSprLock"), "locZ", 5001);
  setThePropOf(meProp(_me, "m_rSprLED"), "loc", tloc);
  setThePropOf(meProp(_me, "m_rSprLED"), "locZ", 5001);
}

