// 38365562899c7799eeaea4a99041ea57.cct / CQuestPage / parseItem

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function parseItem(_me: LingoMe, t_rItem: LingoValue, t_rParentComponent: LingoValue, t_sDefaultDesc: LingoValue) {
  var t_sDesc = t_sDefaultDesc;
  if (lingoBinary("neq", t_rItem.param["DESC"], "")) {
  t_sDesc = t_rItem.param["DESC"];
  }

  var t_rComponent = callMethod("addComponent", t_rParentComponent, t_sDesc);
  for (var t_rNode of t_rItem.child.toArray()) {
  if (lingoBinary("eq", t_rNode._type, "NODE")) {
  callMethod("parseNode", _me, t_rNode, t_rComponent)
  continue;
  }

  if (lingoBinary("eq", t_rNode._type, "ITEM")) {
  callMethod("parseItem", _me, t_rNode, t_rComponent, t_sDefaultDesc)
  }

  }

}

