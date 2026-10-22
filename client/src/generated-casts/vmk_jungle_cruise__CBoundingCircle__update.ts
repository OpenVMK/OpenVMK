// vmk_jungle_cruise.cct / CBoundingCircle / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe) {
  if (meProp(_me, "animating")) {
  setMeProp(_me, "velocity", lingoBinary("mul", meProp(_me, "velocity"), meProp(_me, "m_pVelocityModifier")));
  setMeProp(_me, "velocity", lingoBinary("add", meProp(_me, "velocity"), meProp(_me, "m_pForce")));
  }

  if (meProp(_me, "m_bVisualizeBoundary")) {
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_pSprite"))) ? 0 : 1)) {
  setThePropOf(meProp(_me, "m_pSprite"), "loc", callNamed("ProjectAxonometricPosition", callNamed("point", meProp(_me, "origin").x, meProp(_me, "origin").y)));
  }

  }

}

