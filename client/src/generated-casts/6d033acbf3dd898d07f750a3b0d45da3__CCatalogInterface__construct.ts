// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCatalogInterface / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_bDataReceived", 0);
  setMeProp(_me, "m_rItemListObj", undefined);
  setMeProp(_me, "m_iPageToShow", undefined);
  setMeProp(_me, "m_rWindow", undefined);
  setMeProp(_me, "m_SubpageToShow", undefined);
  setMeProp(_me, "m_sShopsMissingWriter", "Catalog Shops Missing Writer");
  callNamed("registerMessage", symbol("Initialize"), callMethod("getID", _this), symbol("AllCastsDone"))
  callNamed("registerMessage", "room_leave", callMethod("getID", _this), symbol("CloseCatalog"))
  callNamed("registerMessage", symbol("ui_catalog"), callMethod("getID", _this), symbol("OpenCloseCatalog"))
  callNamed("registerMessage", symbol("close_catalog"), callMethod("getID", _this), symbol("CloseCatalog"))
  callNamed("registerMessage", "showCatalogPage", callMethod("getID", _this), symbol("showDefinedCatalogPage"))
  return 1;
}

