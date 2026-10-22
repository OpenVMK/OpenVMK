// vmk_pirates_minigame.cct / CCloudVisualizer / update

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
  var tProjPos = callNamed("ProjectAxonometricPosition", callNamed("point", tPos.x, tPos.y));
  setThePropOf(meProp(_me, "m_rSprite"), "loc", tProjPos);
  setThePropOf(meProp(_me, "m_rShadowSprite"), "loc", callNamed("point", lingoBinary("add", tProjPos.locH, 50), lingoBinary("add", tProjPos.locV, 150)));
  callMethod("SprZToFixed", _me, new LingoList([meProp(_me, "m_rSprite")]), callNamed("vector", 500, 500, 15000))
  callMethod("SprZToFixed", _me, new LingoList([meProp(_me, "m_rShadowSprite")]), callNamed("vector", 500, 500, 10000))
}

