// fireworks_engine.cct / Simple 3D View Class / new

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _new(_me: LingoMe, a: LingoValue, b: LingoValue, mu: LingoValue, ppd: LingoValue) {
  if (lingoBinary("or", lingoBinary("or", lingoBinary("or", (lingoTruthy(callNamed("ilk", a, symbol("number"))) ? 0 : 1), (lingoTruthy(callNamed("ilk", b, symbol("number"))) ? 0 : 1)), (lingoTruthy(callNamed("ilk", mu, symbol("number"))) ? 0 : 1)), (lingoTruthy(callNamed("ilk", ppd, symbol("number"))) ? 0 : 1))) {
  setMeProp(_me, "fViewTheta", float(0));
  setMeProp(_me, "fViewOmega", float(0));
  setMeProp(_me, "fViewMu", float(10));
  setMeProp(_me, "fProjectionPD", float(500));
  setMeProp(_me, "fViewNearClip", 0.05);
  setMeProp(_me, "fViewFarClip", float(200));
  } else {
  setMeProp(_me, "fViewTheta", a);
  setMeProp(_me, "fViewOmega", b);
  setMeProp(_me, "fViewMu", mu);
  setMeProp(_me, "fProjectionPD", ppd);
  setMeProp(_me, "fViewNearClip", 0.05);
  setMeProp(_me, "fViewFarClip", float(200));
  }

  setMeProp(_me, "viewMatrix", callMethod("buildViewMatrix", _me, meProp(_me, "fViewTheta"), meProp(_me, "fViewOmega"), meProp(_me, "fViewMu")));
  return _me;
}

