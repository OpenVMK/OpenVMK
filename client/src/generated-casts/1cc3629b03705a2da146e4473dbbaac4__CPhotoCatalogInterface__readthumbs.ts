// 1cc3629b03705a2da146e4473dbbaac4.cct / CPhotoCatalogInterface / readthumbs

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function readthumbs(_me: LingoMe) {
  if (callNamed("voidp", meProp(_me, "m_rThumblist"))) {
  setMeProp(_me, "m_rThumblist", callNamed("createObject", "ThumbListView", "CThumbList"));
  callMethod("SetDimensions", meProp(_me, "m_rThumblist"), meProp(_me, "m_iDefaultWidth"), meProp(_me, "m_iDefaultHeight"))
  }

  if (callNamed("voidp", meProp(_me, "m_rThumblist"))) {
  return callNamed("error", _me, "Error creating thumbnail list view", symbol("reDraw"));
  }

  var tempMember = callNamed("getMember", "tempImg");
  var tPhotos = callMethod("GetPhotos", callMethod("getComponent", _me));
  callMethod("clear", meProp(_me, "m_rThumblist"))
  for (var i = 1; i <= callMethod("getMaxCount", meProp(_me, "m_rThumblist")); ++i) {
  if (lingoBinary("lte", lingoBinary("add", meProp(_me, "m_iOffset"), i), tPhotos.count)) {
  var tID = callMethod("getPropAt", tPhotos, lingoBinary("add", meProp(_me, "m_iOffset"), i));
  var tThumbMedia = callMethod("getaProp", tPhotos, tID).thumb;
  if ((lingoTruthy(callNamed("voidp", tThumbMedia)) ? 0 : 1)) {
  setThePropOf(tempMember, "media", tThumbMedia.image);
  setThePropOf(tempMember, "palette", callNamed("getMember", "sepia_palette_catalog"));
  callMethod("addItem", meProp(_me, "m_rThumblist"), tID, callMethod("duplicate", tempMember.image))
  continue;
  }

  callMethod("addItem", meProp(_me, "m_rThumblist"), tID, callNamed("getMember", "loaderImg").image)
  }

  }

}

