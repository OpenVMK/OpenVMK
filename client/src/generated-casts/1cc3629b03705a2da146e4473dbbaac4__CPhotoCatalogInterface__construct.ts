// 1cc3629b03705a2da146e4473dbbaac4.cct / CPhotoCatalogInterface / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_sWindowTitle", "Photo Catalog");
  setMeProp(_me, "m_view", symbol("thumbs"));
  setMeProp(_me, "m_visible", 0);
  setMeProp(_me, "m_bMerged", 0);
  setMeProp(_me, "m_rThumblist", undefined);
  setMeProp(_me, "m_iCurrentID", 0);
  setMeProp(_me, "m_iOffset", 0);
  setMeProp(_me, "m_pCannedField", 0);
  setMeProp(_me, "m_bCaptionEdited", 0);
  setMeProp(_me, "m_mp_lastCaption", new LingoPropList([]));
  setMeProp(_me, "m_iDefaultWidth", 332);
  setMeProp(_me, "m_iDefaultHeight", 167);
  callNamed("registerMessage", symbol("ui_photocatalog"), callMethod("getID", _me), symbol("showHidePhotoCatalog"))
  callNamed("registerMessage", symbol("room_leave"), callMethod("getID", _me), symbol("hidePhotoCatalog"))
  return 1;
}

