// 38365562899c7799eeaea4a99041ea57.cct / CQuestSubtaskMinigame / updateDefaults

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function updateDefaults(_me: LingoMe) {
  var t_rComponents = meProp(_me, "m_ar_components")["quest.gamelist"];
  var t_ID = callNamed("integer", callMethod("getEvent", callMethod("GetActive", t_rComponents)));
  if (lingoBinary("gt", t_ID, 0)) {
  meProp(_me, "m_ar_defaults")[symbol("min")] = callNamed("integer", callNamed("getText", lingoBinary("join", lingoBinary("join", "quest.minigame.", t_ID), ".min"), 0));
  meProp(_me, "m_ar_defaults")[symbol("max")] = callNamed("integer", callNamed("getText", lingoBinary("join", lingoBinary("join", "quest.minigame.", t_ID), ".max"), 100000));
  meProp(_me, "m_ar_defaults")[symbol("accuracy")] = callNamed("integer", callNamed("getText", lingoBinary("join", lingoBinary("join", "quest.minigame.", t_ID), ".accuracy"), 5));
  meProp(_me, "m_ar_defaults")[symbol("default")] = callNamed("integer", callNamed("getText", lingoBinary("join", lingoBinary("join", "quest.minigame.", t_ID), ".default"), 0));
  }

  callMethod("setAmount", _me, meProp(_me, "m_ar_defaults")[symbol("default")])
}

