// vmk_pirates_game.cct / CWhirlpoolVisualizer / update

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
  var tdir = lingoBinary("add", callMethod("GetParam", callMethod("getObject", _me), "Direction"), 1);
  setThePropOf(meProp(_me, "m_rSprite"), "loc", callNamed("ProjectAxonometricPosition", callNamed("point", tPos.x, tPos.y)));
  setThePropOf(meProp(_me, "m_rSprite"), "member", meProp(_me, "m_ar_frames")[meProp(_me, "m_iFrame")]);
  setThePropOf(meProp(_me, "m_rSprite"), "width", meProp(_me, "m_rSprite").member.width);
  setThePropOf(meProp(_me, "m_rSprite"), "height", meProp(_me, "m_rSprite").member.height);
  setMeProp(_me, "m_iFrame", lingoBinary("add", meProp(_me, "m_iFrame"), 1));
  if (lingoBinary("gt", meProp(_me, "m_iFrame"), meProp(_me, "m_ar_frames").count)) {
  setMeProp(_me, "m_iFrame", 1);
  }

  callMethod("SprZToScreenSpace", _me, new LingoList([meProp(_me, "m_rSprite")]), 0)
}

