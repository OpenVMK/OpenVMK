// vmk_pirates2_minigame.cct / CPiratesVisualizerMoonlight / update

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
  var tloc = callNamed("ProjectAxonometricPosition", callNamed("point", tPos.x, tPos.y));
  setThePropOf(meProp(_me, "m_rSprite"), "loc", tloc);
  callMethod("SprZToFixed", _me, new LingoList([meProp(_me, "m_rSprite")]), callNamed("vector", 500, 500, 15000))
}

