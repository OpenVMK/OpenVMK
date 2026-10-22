// vmk_pirates_minigame.cct / CPiratesBridgeVisualizer / update

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
  var tHealth = callMethod("GetParam", callMethod("getObject", _me), "GameParams")[meProp(_me, "m_HEALTH")];
  setThePropOf(meProp(_me, "m_rSprite"), "member", meProp(_me, "m_ar_graphicTable")[1]);
  setThePropOf(meProp(_me, "m_rSprite"), "loc", callNamed("ProjectAxonometricPosition", callNamed("point", tPos.x, tPos.y)));
  setThePropOf(meProp(_me, "m_rFlameSprite"), "loc", callNamed("ProjectAxonometricPosition", callNamed("point", tPos.x, tPos.y)));
  if (lingoBinary("and", callMethod("GetParam", callMethod("getObject", _me), "Killed"), (lingoTruthy(callNamed("voidp", meProp(_me, "m_rFlameSprite").member)) ? 0 : 1))) {
  setThePropOf(meProp(_me, "m_rFlameSprite"), "member", meProp(_me, "m_flameMember"));
  }

  callMethod("SprZToScreenSpace", _me, new LingoList([meProp(_me, "m_rSprite")]), 0)
}

