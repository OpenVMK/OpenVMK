// vmk_jungle_cruise.cct / CHazardManager / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_stage", undefined);
  setMeProp(_me, "m_ar_visibleHazards", new LingoList([]));
  setMeProp(_me, "m_lastTime", theProperty("milliSeconds"));
  setMeProp(_me, "m_roomContext", undefined);
  setMeProp(_me, "m_boat", undefined);
  callNamed("dumpVariableField", callNamed("getMember", "JC.Elements.list"))
  var t_mp_aElementNames = callNamed("getVariableValue", "JungleCruise_ElementNames");
  setMeProp(_me, "m_mp_elementDecl", new LingoList([]));
  for (var tElement of t_mp_aElementNames.toArray()) {
  var tID = callNamed("getVariableValue", lingoBinary("join", lingoBinary("join", "JC.Element.", tElement), ".ID"));
  var tEntry = callNamed("getVariableValue", lingoBinary("join", lingoBinary("join", "JC.Element.", tElement), ".frames.entry"));
  var tLoop = callNamed("getVariableValue", lingoBinary("join", lingoBinary("join", "JC.Element.", tElement), ".frames.loop"));
  var tLeave = callNamed("getVariableValue", lingoBinary("join", lingoBinary("join", "JC.Element.", tElement), ".frames.leave"));
  callMethod("setaProp", meProp(_me, "m_mp_elementDecl"), tID, new LingoPropList([symbol("name"), tElement, symbol("entry"), tEntry, symbol("loop"), tLoop, symbol("leave"), tLeave]))
  }

  return 1;
}

