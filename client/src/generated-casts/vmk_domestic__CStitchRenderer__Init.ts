// vmk_domestic.cct / CStitchRenderer / Init

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Init(_me: LingoMe, _this: LingoValue, t_rSprite: LingoValue) {
  /* global */ var gDebugMode = globalVar("gDebugMode");
  if (lingoBinary("and", callNamed("voidp", t_rSprite), globalVar("gDebugMode"))) {
  t_rSprite = callNamed("sprite", 100);
  callNamed("puppetSprite", 100, 1)
  setThePropOf(callNamed("sprite", 100), "loc", callNamed("point", 150, 150));
  }

  setThePropOf(_this, "m_rSprite", t_rSprite);
  setThePropOf(_this, "m_rAction", "std");
  setThePropOf(_this, "m_rDirection", 3);
  setThePropOf(_this, "m_rAnimFrame", 0);
  setThePropOf(_this, "m_rCurrentFrame", 0);
  setThePropOf(_this, "m_rWalkSpeed", 6);
  setThePropOf(_this, "m_bDirty", 1);
  setThePropOf(_this, "m_sType", "stitch");
  if (globalVar("gDebugMode")) {
  callNamed("registerFrameHandler", _this, symbol("update"))
  }

}

