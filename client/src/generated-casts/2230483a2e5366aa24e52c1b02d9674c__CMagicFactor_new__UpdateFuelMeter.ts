// 2230483a2e5366aa24e52c1b02d9674c.cct / CMagicFactor_new / UpdateFuelMeter

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function UpdateFuelMeter(_me: LingoMe) {
  /* global */ var pTemp = globalVar("pTemp");
  if (callNamed("voidp", _me.m_iFuelPercent)) {
  return;
  }

  if (lingoBinary("eq", _me.m_SprFuel1, undefined)) {
  setThePropOf(_me, "m_SprFuel1", callNamed("sprite", callNamed("reserveSprite")));
  }

  if (lingoBinary("eq", _me.m_SprFuel2, undefined)) {
  setThePropOf(_me, "m_SprFuel2", callNamed("sprite", callNamed("reserveSprite")));
  }

  setThePropOf(_me, "member", callNamed("getMember", "fuel_status_bar"));
  if (lingoBinary("gt", _me.m_iFuelPercent, 25)) {
  setThePropOf(_me, "member", callNamed("getMember", "fuel_status_green"));
  } else {
  setThePropOf(_me, "member", callNamed("getMember", "fuel_status_red"));
  }

  var t_BarWidth = lingoBinary("div", lingoBinary("mul", 45, callNamed("float", _me.m_iFuelPercent)), 100);
  setThePropOf(_me, "width", t_BarWidth);
  setThePropOf(_me, "height", 2);
  setThePropOf(_me, "locH", lingoBinary("sub", _me.m_veAvatarLoc.x, 9));
  setThePropOf(_me, "locV", lingoBinary("sub", _me.m_veAvatarLoc.y, 99));
  setThePropOf(_me, "locZ", lingoBinary("add", _me.m_veAvatarLoc.z, 50));
  setThePropOf(_me, "ink", 36);
  setThePropOf(_me, "locH", lingoBinary("sub", _me.m_veAvatarLoc.x, 10));
  setThePropOf(_me, "locV", lingoBinary("sub", _me.m_veAvatarLoc.y, 100));
  setThePropOf(_me, "locZ", _me.m_veAvatarLoc.z);
  setThePropOf(_me, "ink", 36);
}

