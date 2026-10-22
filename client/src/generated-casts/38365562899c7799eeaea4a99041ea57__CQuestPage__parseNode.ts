// 38365562899c7799eeaea4a99041ea57.cct / CQuestPage / parseNode

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function parseNode(_me: LingoMe, t_rNode: LingoValue, t_rComponent: LingoValue) {
  var t_ID = callNamed("value", t_rNode.param["ID"]);
  var t_sTxtKey = t_rNode.param["CAPTION"];
  if (lingoBinary("neq", t_sTxtKey, "")) {
  var t_sCaption = callNamed("getText", t_sTxtKey);
  } else {
  t_sCaption = "";
  }

  var t_sEvent = t_rNode.param["EVENT"];
  var t_sIcon = t_rNode.param["ICON"];
  var t_rLayout = callMethod("GetLayout", t_rComponent, t_ID);
  if (callNamed("objectp", t_rLayout)) {
  if (lingoBinary("neq", t_sEvent, "")) {
  callMethod("setEvent", t_rLayout, t_sEvent)
  }

  if (lingoBinary("neq", t_sCaption, "")) {
  callMethod("setText", t_rLayout, t_sCaption)
  }

  if (lingoBinary("neq", t_sIcon, "")) {
  callMethod("setIcon", t_rLayout, t_sIcon)
  }

  callMethod("setNode", t_rLayout, callMethod("duplicate", t_rNode.param))
  }

}

