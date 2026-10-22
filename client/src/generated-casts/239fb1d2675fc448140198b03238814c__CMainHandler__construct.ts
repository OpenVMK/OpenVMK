// 239fb1d2675fc448140198b03238814c.cct / CMainHandler / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_objLoadingWindow", undefined);
  callNamed("registerMessage", symbol("dictionary_ready"), callMethod("getID", _this), symbol("OpenConnection"))
  callNamed("registerMessage", symbol("furnimap_ready"), callMethod("getID", _this), symbol("UpdateFurnimapState"))
  setMeProp(_me, "m_bFurniMapsLoaded", 0);
  callMethod("regMsgList", _this, 1)
  return 1;
}

