// 38365562899c7799eeaea4a99041ea57.cct / CQuestPageStep1 / reDraw

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function reDraw(_me: LingoMe) {
  var tempMember = callNamed("getMember", "tempImg");
  var tPic = callMethod("getPhoto", callMethod("getComponent", callNamed("getThread", symbol("PhotoCatalog"))), meProp(_me, "m_iCurrentPhotoID"));
  if ((lingoTruthy(callNamed("voidp", tPic)) ? 0 : 1)) {
  callMethod("show", callMethod("getElement", meProp(_me, "m_rWindow"), "fto.view"))
  var tPhotoMedia = tPic.pic;
  if (callNamed("voidp", tPhotoMedia)) {
  callMethod("RequestCatalogPhoto", callMethod("getComponent", callNamed("getThread", symbol("PhotoCatalog"))), meProp(_me, "m_iCurrentPhotoID"))
  callMethod("feedImage", callMethod("getElement", meProp(_me, "m_rWindow"), "fto.view"), callNamed("getMember", "loaderImg").image)
  } else {
  setThePropOf(tempMember, "media", tPhotoMedia.image);
  setThePropOf(tempMember, "palette", callNamed("getMember", "sepia_palette_catalog"));
  callMethod("feedImage", callMethod("getElement", meProp(_me, "m_rWindow"), "fto.view"), tempMember.image)
  }

  } else {
  callMethod("hide", callMethod("getElement", meProp(_me, "m_rWindow"), "fto.view"))
  }

}

