// vmk_pirates2_minigame.cct / CSeamonsterVisualizer / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_rSprite", callNamed("sprite", callMethod("reserveSprite", callNamed("getSpriteManager"), callMethod("getID", _me))));
  setThePropOf(meProp(_me, "m_rSprite"), "member", callNamed("getMember", "seamonster_06"));
  setThePropOf(meProp(_me, "m_rSprite"), "ink", 36);
  setThePropOf(meProp(_me, "m_rSprite"), "locZ", -float(49));
  setMeProp(_me, "m_bMirror", 0);
  setMeProp(_me, "m_ATTACK_BIT", 1);
  setMeProp(_me, "m_ar_frames", new LingoList(["seamonster_06", "seamonster_10", "seamonster_10", "seamonster_12", "seamonster_12", "seamonster_14", "seamonster_14", "seamonster_18", "seamonster_18", "seamonster_20", "seamonster_20", "seamonster_22", "seamonster_22", "seamonster_24", "seamonster_24", "seamonster_26", "seamonster_26", "seamonster_28", "seamonster_28", "seamonster_30", "seamonster_30", "seamonster_40", "seamonster_40", "seamonster_38", "seamonster_38", "seamonster_38", "seamonster_38", "seamonster_40", "seamonster_40", "seamonster_40", "seamonster_40", "seamonster_38", "seamonster_38", "seamonster_38", "seamonster_38", "seamonster_40", "seamonster_40", "seamonster_40", "seamonster_40", "seamonster_38", "seamonster_38", "seamonster_28", "seamonster_28", "seamonster_14", "seamonster_14", "seamonster_12", "seamonster_12", "seamonster_10", "seamonster_10", "seamonster_06", "seamonster_06"]));
  for (var i = 1; i <= meProp(_me, "m_ar_frames").count; ++i) {
  meProp(_me, "m_ar_frames")[i] = callNamed("getMember", meProp(_me, "m_ar_frames")[i]);
  var temp = meProp(_me, "m_ar_frames")[i].image;
  }

  setMeProp(_me, "m_attackFrame", 1);
  setMeProp(_me, "m_vLocalPosition", undefined);
  return 1;
}

