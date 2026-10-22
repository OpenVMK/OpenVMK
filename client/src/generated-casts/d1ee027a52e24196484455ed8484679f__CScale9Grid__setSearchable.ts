// d1ee027a52e24196484455ed8484679f.cct / CScale9Grid / setSearchable

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setSearchable(_me: LingoMe, a_bSearchable: LingoValue) {
  setMeProp(_me, "m_bSearchable", a_bSearchable);
  if (meProp(_me, "m_bSearchable")) {
  callNamed("registerMessage", symbol("SearchCellContainingData"), callMethod("getID", _me), symbol("searchCellForData"))
  }

}

