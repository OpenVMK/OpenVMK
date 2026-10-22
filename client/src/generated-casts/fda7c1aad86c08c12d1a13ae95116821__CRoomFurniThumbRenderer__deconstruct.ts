// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomFurniThumbRenderer / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  if (callNamed("writerExists", meProp(_me, "m_sWriterA"))) {
  callNamed("removeWriter", meProp(_me, "m_sWriterA"))
  }

  if (callNamed("writerExists", meProp(_me, "m_sWriterB"))) {
  callNamed("removeWriter", meProp(_me, "m_sWriterB"))
  }

  setMeProp(_me, "m_iType_rPreviewCache", new LingoPropList([]));
  setMeProp(_me, "m_iType_rThumbnailCache", new LingoPropList([]));
  setMeProp(_me, "m_rFurniMap", undefined);
  callNamed("unregisterMessage", "GetFurniPreview", callMethod("getID", _this))
  callNamed("unregisterMessage", "GetFurniThumbnail", callMethod("getID", _this))
  callNamed("unregisterMessage", "GetPosterPreview", callMethod("getID", _this))
  callNamed("unregisterMessage", "GetPosterThumbnail", callMethod("getID", _this))
  callNamed("unregisterMessage", "GetPinPreview", callMethod("getID", _this))
  callNamed("unregisterMessage", "GetPinThumbnail", callMethod("getID", _this))
  return 1;
}

