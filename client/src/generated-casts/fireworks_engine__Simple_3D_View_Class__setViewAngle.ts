// fireworks_engine.cct / Simple 3D View Class / setViewAngle

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setViewAngle(_me: LingoMe, a: LingoValue, b: LingoValue) {
  setMeProp(_me, "fViewTheta", a);
  setMeProp(_me, "fViewOmega", b);
  setMeProp(_me, "viewMatrix", callMethod("buildViewMatrix", _me, meProp(_me, "fViewTheta"), meProp(_me, "fViewOmega"), meProp(_me, "fViewMu")));
}

