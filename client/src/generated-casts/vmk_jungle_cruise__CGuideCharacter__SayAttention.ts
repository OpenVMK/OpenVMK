// vmk_jungle_cruise.cct / CGuideCharacter / SayAttention

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SayAttention(_me: LingoMe, a_val: LingoValue) {
  var tProb = callNamed("random", 100);
  if (lingoBinary("lte", tProb, meProp(_me, "m_attentionPropability"))) {
  if ((lingoTruthy(a_val) ? 0 : 1)) {
  a_val = callNamed("random", meProp(_me, "m_mp_lines").attention.count);
  }

  callMethod("SaySomething", _me, meProp(_me, "m_mp_lines").attention[a_val].sound, meProp(_me, "m_mp_lines").attention[a_val].text)
  }

}

