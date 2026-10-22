// vmk_tutorial.cct / CGuideCharacter / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe) {
  if (meProp(_me, "m_bGuideVisible")) {
  var tTime = lingoBinary("div", theProperty("milliSeconds"), float(1000));
  var dt = lingoBinary("sub", tTime, meProp(_me, "m_lastTime"));
  setMeProp(_me, "m_lastTime", tTime);
  switch (meProp(_me, "m_state")) {
case symbol("idle"):
  setThePropOf(meProp(_me, "m_charSprite"), "member", meProp(_me, "m_ar_frames")[1]);
  break;
case symbol("speaking"):
  var tRem = lingoBinary("mod", theProperty("milliSeconds"), meProp(_me, "m_mp_constants")["LipFrequencyMS"]);
  var tFrame = lingoBinary("add", lingoBinary("div", tRem, lingoBinary("add", lingoBinary("div", meProp(_me, "m_mp_constants")["LipFrequencyMS"], meProp(_me, "m_ar_frames").count), 1)), 1);
  setThePropOf(meProp(_me, "m_charSprite"), "member", meProp(_me, "m_ar_frames")[tFrame]);
  setMeProp(_me, "m_duration", lingoBinary("sub", meProp(_me, "m_duration"), dt));
  if (lingoBinary("lt", meProp(_me, "m_duration"), float(0))) {
  setMeProp(_me, "m_state", symbol("idle"));
  }

  break;
  }

  }

}

