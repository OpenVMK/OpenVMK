// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomFurniThumbRenderer / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_iType_rPreviewCache", new LingoPropList([]));
  setMeProp(_me, "m_iType_rThumbnailCache", new LingoPropList([]));
  var m_rcPrevRect = callNamed("rect", 0, 0, 104, 128);
  setMeProp(_me, "m_rcThumbRect", callNamed("rect", 0, 0, 38, 38));
  setMeProp(_me, "m_rFurniMap", undefined);
  setMeProp(_me, "m_rFurniAssetManager", callMethod("GetFurniAssetManager", callNamed("getThread", symbol("room")).component));
  setMeProp(_me, "m_sWriterA", callNamed("getUniqueID"));
  setMeProp(_me, "m_sWriterB", callNamed("getUniqueID"));
  var t_rPlain = callNamed("getStructVariable", "struct.font.plain");
  var t_rMetrics = new LingoPropList([symbol("font"), callMethod("getaProp", t_rPlain, symbol("font")), symbol("fontStyle"), callMethod("getaProp", t_rPlain, symbol("fontStyle")), symbol("color"), callNamed("rgb", 250, 250, 250), symbol("bgColor"), callNamed("rgb", 225, 255, 255), symbol("fixedLineSpace"), 15]);
  callNamed("createWriter", meProp(_me, "m_sWriterA"), t_rMetrics)
  t_rMetrics = new LingoPropList([symbol("font"), callMethod("getaProp", t_rPlain, symbol("font")), symbol("fontStyle"), callMethod("getaProp", t_rPlain, symbol("fontStyle")), symbol("color"), callNamed("rgb", 2, 2, 2), symbol("bgColor"), callNamed("rgb", 225, 255, 255), symbol("fixedLineSpace"), 15]);
  callNamed("createWriter", meProp(_me, "m_sWriterB"), t_rMetrics)
  callNamed("registerMessage", "GetFurniPreview", callMethod("getID", _this), symbol("_FetchFurniPreview"))
  callNamed("registerMessage", "GetFurniThumbnail", callMethod("getID", _this), symbol("_FetchFurniThumbnail"))
  callNamed("registerMessage", "GetPosterPreview", callMethod("getID", _this), symbol("_FetchPosterPreview"))
  callNamed("registerMessage", "GetPosterThumbnail", callMethod("getID", _this), symbol("_FetchPosterThumbnail"))
  callNamed("registerMessage", "GetPinPreview", callMethod("getID", _this), symbol("_FetchPinPreview"))
  callNamed("registerMessage", "GetPinThumbnail", callMethod("getID", _this), symbol("_FetchPinThumbnail"))
  return 1;
}

