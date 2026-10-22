// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomObjectPlacer / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe, _this: LingoValue) {
  if (meProp(_me, "m_bRunning")) {
  if (callNamed("objectp", meProp(_me, "m_rMovable"))) {
  switch (callMethod("GetParam", meProp(_me, "m_rMovable"), "CLASS")) {
case "element":
  callMethod("_UpdateElement", _this)
  break;
case "poster":
  callMethod("_UpdatePoster", _this)
  break;
  }

  }

  }

}

