// 3f02613936ba018480acffaf92dd883a.cct / CSpriteAnimationObject / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_ar_params", new LingoPropList([]));
  setMeProp(_me, "m_rVisual", callNamed("createObject", symbol("random"), callNamed("GetClsVariable", "room.class.visual.vmkanimation")));
  setMeProp(_me, "m_rFactor", callNamed("createObject", symbol("random"), callNamed("GetClsVariable", "room.class.factor.vmkanimation")));
  callMethod("SetObject", meProp(_me, "m_rVisual"), _me)
  callMethod("SetObject", meProp(_me, "m_rFactor"), _me)
  setMeProp(_me, "m_vPos", callNamed("vector", 0, 0, 0));
  callNamed("receiveUpdate", callMethod("getID", _me))
  return 1;
}

