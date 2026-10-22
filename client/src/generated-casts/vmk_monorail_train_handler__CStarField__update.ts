// vmk_monorail_train_handler.cct / CStarField / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe) {
  switch (meProp(_me, "m_iState")) {
case symbol("accelerate"):
  setMeProp(_me, "m_iSpeed", lingoBinary("add", meProp(_me, "m_iSpeed"), 0.005));
  if (lingoBinary("gte", meProp(_me, "m_iSpeed"), 1.5)) {
  setMeProp(_me, "m_iSpeed", 1.5);
  setMeProp(_me, "m_iState", symbol("normal"));
  }

  break;
case symbol("slowspeed"):
  setMeProp(_me, "m_iSpeed", lingoBinary("sub", meProp(_me, "m_iSpeed"), 0.005));
  if (lingoBinary("lte", meProp(_me, "m_iSpeed"), 0)) {
  setMeProp(_me, "m_iSpeed", 0);
  setMeProp(_me, "m_iState", symbol("normal"));
  }

  break;
  }

  for (var t_star of meProp(_me, "m_pStarAnimations").toArray()) {
  if ((lingoTruthy(lingoBinary("eq", meProp(_me, "m_iState"), symbol("stopped"))) ? 0 : 1)) {
  if ((lingoTruthy(lingoBinary("eq", meProp(_me, "m_iState"), symbol("normal"))) ? 0 : 1)) {
  callMethod("setSpeed", t_star, meProp(_me, "m_iSpeed"))
  }

  callMethod("update", t_star)
  callMethod("render", t_star)
  }

  }

}

