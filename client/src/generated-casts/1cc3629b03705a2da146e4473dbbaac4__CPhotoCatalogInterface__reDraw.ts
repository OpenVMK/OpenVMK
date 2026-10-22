// 1cc3629b03705a2da146e4473dbbaac4.cct / CPhotoCatalogInterface / reDraw

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function reDraw(_me: LingoMe) {
  callNamed("executeMessage", symbol("photo_catalog_redraw"))
  if (meProp(_me, "m_visible")) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWindowTitle"));
  callMethod("readthumbs", _me)
  if (lingoBinary("eq", meProp(_me, "m_view"), symbol("thumbs"))) {
  callMethod("feedImage", callMethod("getElement", tWndObj, "fto.thumbs.grid"), callMethod("render", meProp(_me, "m_rThumblist")))
  }

  if (lingoBinary("eq", meProp(_me, "m_view"), symbol("Full"))) {
  var tempMember = callNamed("getMember", "tempImg");
  var tPic = callMethod("getPhoto", callMethod("getComponent", _me), meProp(_me, "m_iCurrentID"));
  if ((lingoTruthy(callNamed("voidp", tPic)) ? 0 : 1)) {
  var tPhotoMedia = tPic.pic;
  if (callNamed("voidp", tPhotoMedia)) {
  callMethod("RequestCatalogPhoto", callMethod("getComponent", _me), meProp(_me, "m_iCurrentID"))
  callMethod("feedImage", callMethod("getElement", tWndObj, "fto.view"), callNamed("getMember", "loaderImg").image)
  } else {
  setThePropOf(tempMember, "media", tPhotoMedia.image);
  setThePropOf(tempMember, "palette", callNamed("getMember", "sepia_palette_catalog"));
  callMethod("feedImage", callMethod("getElement", tWndObj, "fto.view"), tempMember.image)
  callMethod("setText", callMethod("getElement", tWndObj, "camera.caption.input"), callMethod("getPhoto", callMethod("getComponent", _me), meProp(_me, "m_iCurrentID")).Caption)
  }

  }

  }

  }

}

