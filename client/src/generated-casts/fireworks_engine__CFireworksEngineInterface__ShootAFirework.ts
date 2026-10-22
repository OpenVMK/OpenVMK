// fireworks_engine.cct / CFireworksEngineInterface / ShootAFirework

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ShootAFirework(_me: LingoMe, i_sType: LingoValue, i_vPosition: LingoValue, i_vDirectionNormal: LingoValue) {
  var tPayload = callNamed("new", meProp(_me, "m_refPayloadScript"));
  var tContents = callNamed("getVariableValue", i_sType);
  if (callNamed("voidp", tContents)) {
  callNamed("error", _me, lingoBinary("join", i_sType, " variable is invalid."), symbol("ShootAFirework"))
  }

  callMethod("parsePayload", tPayload, tContents, i_vDirectionNormal)
  callMethod("setPosition", tPayload, i_vPosition)
  callMethod("SetRocketVisual", tPayload, new LingoList([new LingoPropList([symbol("ms"), 5000, symbol("sprite"), "Test Spark 4"]), new LingoPropList([symbol("loop"), 1])]))
  callMethod("AddFirework", meProp(_me, "m_fwEngineCore"), tPayload)
  return tPayload;
}

