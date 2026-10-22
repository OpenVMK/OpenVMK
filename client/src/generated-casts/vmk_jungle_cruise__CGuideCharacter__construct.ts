// vmk_jungle_cruise.cct / CGuideCharacter / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_charSprite", undefined);
  setMeProp(_me, "m_barSprite", undefined);
  setMeProp(_me, "m_ar_frames", callNamed("getVariableValue", "guide_speaking_frames"));
  setMeProp(_me, "m_mp_constants", new LingoPropList([]));
  callMethod("setaProp", meProp(_me, "m_mp_constants"), "LipFrequencyMS", 50)
  setMeProp(_me, "m_state", symbol("idle"));
  setMeProp(_me, "m_duration", float(0));
  callNamed("receiveUpdate", callMethod("getID", _me))
  var tFontPlain = callNamed("getStructVariable", "struct.font.plain");
  callMethod("setaProp", tFontPlain, symbol("color"), callNamed("rgb", "#FEFEFE"))
  callMethod("setaProp", tFontPlain, symbol("bgColor"), callNamed("rgb", "#000000"))
  callMethod("setaProp", tFontPlain, symbol("lineHeight"), 20)
  callMethod("setaProp", tFontPlain, symbol("fontSize"), 20)
  callMethod("setaProp", tFontPlain, symbol("alignment"), symbol("center"))
  callNamed("createWriter", "JCNedText", tFontPlain)
  setMeProp(_me, "m_writer", callNamed("getWriter", "JCNedText"));
  setMeProp(_me, "m_writerSprite", undefined);
  callNamed("createMember", "NedsText", symbol("bitmap"))
  setMeProp(_me, "m_rSoundPlayer", 0);
  callNamed("dumpVariableField", callNamed("getMember", "neds_lines"))
  setMeProp(_me, "m_mp_lines", new LingoPropList([symbol("positive"), new LingoList([]), symbol("negative"), new LingoList([]), symbol("attention"), new LingoList([]), symbol("watchout"), new LingoList([])]));
  for (var i = 1; i <= callNamed("getVariableValue", "NedsPositiveCount"); ++i) {
  callMethod("append", meProp(_me, "m_mp_lines").positive, callNamed("getVariableValue", lingoBinary("join", "NedsPositive", i)))
  }

  for (var i = 1; i <= callNamed("getVariableValue", "NedsNegativeCount"); ++i) {
  callMethod("append", meProp(_me, "m_mp_lines").negative, callNamed("getVariableValue", lingoBinary("join", "NedsNegative", i)))
  }

  for (var i = 1; i <= callNamed("getVariableValue", "NedsAttentionCount"); ++i) {
  callMethod("append", meProp(_me, "m_mp_lines").attention, callNamed("getVariableValue", lingoBinary("join", "NedsAttention", i)))
  }

  for (var i = 1; i <= callNamed("getVariableValue", "NedsWatchOutCount"); ++i) {
  callMethod("append", meProp(_me, "m_mp_lines").watchout, callNamed("getVariableValue", lingoBinary("join", "NedsWatchOut", i)))
  }

  setMeProp(_me, "m_positivePropability", 50);
  setMeProp(_me, "m_negativePropability", 35);
  setMeProp(_me, "m_watchoutPropability", 75);
  setMeProp(_me, "m_attentionPropability", 50);
  setMeProp(_me, "m_bGuideVisible", 0);
  return 1;
}

