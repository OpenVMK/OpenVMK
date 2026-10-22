// vmk_junglecruise_minigame.cct / CAnimalManager / construct

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
  setMeProp(_me, "m_mp_visibleAnimals", new LingoList([]));
  setMeProp(_me, "m_mp_animalDecl", new LingoPropList([]));
  setMeProp(_me, "m_lastTime", theProperty("milliSeconds"));
  setMeProp(_me, "m_ar_puffs", new LingoList([]));
  setMeProp(_me, "m_iNextPuffRef", 1);
  setMeProp(_me, "m_mp_ar_spotsTaken", new LingoPropList([]));
  callNamed("dumpVariableField", callNamed("getMember", "animal.list"))
  var t_mp_animalNames = callNamed("getVariableValue", "JungleCruise_AnimalNames");
  for (var tAnimal of t_mp_animalNames.toArray()) {
  var tID = callNamed("getVariableValue", lingoBinary("join", lingoBinary("join", "Animal.", tAnimal), ".ID"));
  var tEntry = callNamed("getVariableValue", lingoBinary("join", lingoBinary("join", "Animal.", tAnimal), ".frames.entry"));
  var tLoop = callNamed("getVariableValue", lingoBinary("join", lingoBinary("join", "Animal.", tAnimal), ".frames.loop"));
  var tLeave = callNamed("getVariableValue", lingoBinary("join", lingoBinary("join", "Animal.", tAnimal), ".frames.leave"));
  var tBlocker = callNamed("getVariableValue", lingoBinary("join", lingoBinary("join", "Animal.", tAnimal), ".blocker"));
  var tScared = callNamed("getVariableValue", lingoBinary("join", lingoBinary("join", "Animal.", tAnimal), ".scared"));
  callMethod("setaProp", meProp(_me, "m_mp_animalDecl"), tID, new LingoPropList([symbol("name"), tAnimal, symbol("entry"), tEntry, symbol("loop"), tLoop, symbol("leave"), tLeave, symbol("blocker"), tBlocker, symbol("scared"), tScared]))
  }

  setMeProp(_me, "m_roomContext", undefined);
  setMeProp(_me, "m_boat", undefined);
  return 1;
}

