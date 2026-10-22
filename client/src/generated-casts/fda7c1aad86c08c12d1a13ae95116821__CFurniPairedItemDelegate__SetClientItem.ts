// fda7c1aad86c08c12d1a13ae95116821.cct / CFurniPairedItemDelegate / SetClientItem

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetClientItem(_me: LingoMe, _this: LingoValue, a_rItem: LingoValue) {
  setMeProp(_me, "m_bSelected", 0);
  setMeProp(_me, "m_rClientItem", a_rItem);
  callNamed("registerMessage", "teleport_selected", callMethod("getID", _this), symbol("PairedItemSelected"))
  callNamed("registerMessage", "teleport_unselected", callMethod("getID", _this), symbol("PairedItemUnselected"))
}

