// vmk_junglecruise_minigame.cct / CGuideCharacter / SaySomething

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SaySomething(_me: LingoMe, i_sSampleMember: LingoValue, i_sText: LingoValue) {
  var tmember = callNamed("getMember", i_sSampleMember);
  setMeProp(_me, "m_state", symbol("speaking"));
  if (lingoBinary("and", (lingoTruthy(callNamed("voidp", tmember)) ? 0 : 1), lingoBinary("neq", meProp(_me, "m_rSoundPlayer"), 0))) {
  callMethod("Guide", meProp(_me, "m_rSoundPlayer"), tmember)
  }

  if (meProp(_me, "m_bGuideVisible")) {
  var tImage = callMethod("render", meProp(_me, "m_writer"), i_sText);
  setThePropOf(meProp(_me, "m_writerSprite").member, "image", tImage);
  setThePropOf(meProp(_me, "m_writerSprite"), "width", meProp(_me, "m_writerSprite").member.width);
  setThePropOf(meProp(_me, "m_writerSprite"), "height", meProp(_me, "m_writerSprite").member.height);
  setThePropOf(meProp(_me, "m_writerSprite").member, "regPoint", callNamed("point", 0, 0));
  }

  setMeProp(_me, "m_duration", float(2));
  setMeProp(_me, "m_lastTime", lingoBinary("div", theProperty("milliSeconds"), float(1000)));
}

