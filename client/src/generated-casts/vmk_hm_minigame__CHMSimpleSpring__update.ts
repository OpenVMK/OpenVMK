// vmk_hm_minigame.cct / CHMSimpleSpring / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe) {
  var t_iX = lingoBinary("add", -float(meProp(_me, "m_vLocation").x), meProp(_me, "m_vDestination").x);
  var t_iY = lingoBinary("add", -float(meProp(_me, "m_vLocation").y), meProp(_me, "m_vDestination").y);
  setMeProp(_me, "m_iDeltaX", lingoBinary("add", lingoBinary("mul", meProp(_me, "m_iDeltaX"), meProp(_me, "m_iInertia")), lingoBinary("mul", t_iX, meProp(_me, "m_iK"))));
  setMeProp(_me, "m_iDeltaY", lingoBinary("add", lingoBinary("mul", meProp(_me, "m_iDeltaY"), meProp(_me, "m_iInertia")), lingoBinary("mul", t_iY, meProp(_me, "m_iK"))));
  setThePropOf(meProp(_me, "m_vLocation"), "x", lingoBinary("add", meProp(_me, "m_vLocation").x, meProp(_me, "m_iDeltaX")));
  setThePropOf(meProp(_me, "m_vLocation"), "y", lingoBinary("add", meProp(_me, "m_vLocation").y, meProp(_me, "m_iDeltaY")));
  var t_dz = lingoBinary("sub", meProp(_me, "m_vDestination").z, meProp(_me, "m_vLocation").z);
  setThePropOf(meProp(_me, "m_vLocation"), "z", lingoBinary("add", meProp(_me, "m_vLocation").z, lingoBinary("div", t_dz, 10)));
}

