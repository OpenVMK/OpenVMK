// d0e535313898676eb605277339b50f27.cct / CMagicFactor / UpdateFuelMeter

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function UpdateFuelMeter(_me: LingoMe) {
  if (callNamed("voidp", meProp(_me, "m_iFuelPercent"))) {
  return;
  }

  if (lingoBinary("eq", meProp(_me, "m_SprFuel1"), undefined)) {
  setMeProp(_me, "m_SprFuel1", callNamed("sprite", callNamed("reserveSprite")));
  }

  if (lingoBinary("eq", meProp(_me, "m_SprFuel2"), undefined)) {
  setMeProp(_me, "m_SprFuel2", callNamed("sprite", callNamed("reserveSprite")));
  }

  setThePropOf(meProp(_me, "m_SprFuel1"), "member", callNamed("getMember", "fuel_status_bar"));
  if (lingoBinary("gt", meProp(_me, "m_iFuelPercent"), 25)) {
  setThePropOf(meProp(_me, "m_SprFuel2"), "member", callNamed("getMember", "fuel_status_green"));
  } else {
  setThePropOf(meProp(_me, "m_SprFuel2"), "member", callNamed("getMember", "fuel_status_red"));
  }

  var t_BarWidth = lingoBinary("mul", 45, lingoBinary("div", callNamed("float", meProp(_me, "m_iFuelPercent")), 100));
  setThePropOf(meProp(_me, "m_SprFuel2"), "width", t_BarWidth);
  setThePropOf(meProp(_me, "m_SprFuel2"), "height", 2);
  setThePropOf(meProp(_me, "m_SprFuel2"), "locH", lingoBinary("sub", meProp(_me, "m_veAvatarLoc").x, 9));
  setThePropOf(meProp(_me, "m_SprFuel2"), "locV", lingoBinary("sub", meProp(_me, "m_veAvatarLoc").y, 99));
  setThePropOf(meProp(_me, "m_SprFuel2"), "locZ", lingoBinary("add", meProp(_me, "m_veAvatarLoc").z, 50));
  setThePropOf(meProp(_me, "m_SprFuel1"), "ink", 36);
  setThePropOf(meProp(_me, "m_SprFuel1"), "locH", lingoBinary("sub", meProp(_me, "m_veAvatarLoc").x, 10));
  setThePropOf(meProp(_me, "m_SprFuel1"), "locV", lingoBinary("sub", meProp(_me, "m_veAvatarLoc").y, 100));
  setThePropOf(meProp(_me, "m_SprFuel1"), "locZ", meProp(_me, "m_veAvatarLoc").z);
  setThePropOf(meProp(_me, "m_SprFuel2"), "ink", 36);
}

