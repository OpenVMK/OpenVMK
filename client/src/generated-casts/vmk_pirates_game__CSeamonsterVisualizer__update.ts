// vmk_pirates_game.cct / CSeamonsterVisualizer / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe) {
  var tPos = callMethod("GetParam", callMethod("getObject", _me), "WorldPosition");
  var tstate = callMethod("GetParam", callMethod("getObject", _me), "State");
  if (callNamed("TestBit", tstate, meProp(_me, "m_ATTACK_BIT"))) {
  setMeProp(_me, "m_attackFrame", lingoBinary("add", meProp(_me, "m_attackFrame"), 1));
  if (lingoBinary("gt", meProp(_me, "m_attackFrame"), meProp(_me, "m_ar_frames").count)) {
  setMeProp(_me, "m_attackFrame", 1);
  callMethod("SetParam", callMethod("getObject", _me), "State", 0)
  }

  }

  setThePropOf(meProp(_me, "m_rSprite"), "member", meProp(_me, "m_ar_frames")[meProp(_me, "m_attackFrame")]);
  setThePropOf(meProp(_me, "m_rSprite"), "width", meProp(_me, "m_rSprite").member.width);
  setThePropOf(meProp(_me, "m_rSprite"), "height", meProp(_me, "m_rSprite").member.height);
  setThePropOf(meProp(_me, "m_rSprite"), "loc", callNamed("ProjectAxonometricPosition", callNamed("point", tPos.x, tPos.y)));
  setThePropOf(meProp(_me, "m_rSprite"), "flipH", meProp(_me, "m_bMirror"));
  callMethod("SprZToScreenSpace", _me, new LingoList([meProp(_me, "m_rSprite")]), 0)
}

