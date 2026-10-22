// 38365562899c7799eeaea4a99041ea57.cct / CQuestPageStep1 / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_iCurrentPhotoID", -float(1));
  setMeProp(_me, "m_iActiveTaskID", -float(1));
  setMeProp(_me, "m_rWindow", undefined);
  var t_ar_photos = callMethod("GetPhotos", callMethod("getComponent", callNamed("getThread", symbol("PhotoCatalog"))));
  if (lingoBinary("eq", t_ar_photos.count, 0)) {
  callMethod("RequestPhotoIndex", callMethod("getHandler", callNamed("getThread", symbol("PhotoCatalog"))))
  }

  callNamed("registerMessage", symbol("photo_catalog_redraw"), callMethod("getID", _me), symbol("reDraw"))
  return 1;
}

