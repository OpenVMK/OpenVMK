// vmk_jungle_cruise.cct / CAlbumWindow / PopulatePhotos

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PopulatePhotos(_me: LingoMe, i_offset: LingoValue) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWindowTitle"));
  if (callNamed("voidp", tWndObj)) {
  return callNamed("error", _me, "Album view window is missing!", symbol("PopulatePhotos"));
  }

  var t_greenImage = callNamed("image", 184, 124, 32);
  callMethod("fill", t_greenImage, t_greenImage.rect, new LingoPropList([symbol("color"), callNamed("rgb", "#434D38")]))
  for (var i = 1; i <= 4; ++i) {
  var tIndex = lingoBinary("sub", lingoBinary("add", meProp(_me, "m_offset"), i), 1);
  var tPicElement = undefined;
  var tScoreElement = undefined;
  switch (i) {
case 1:
  tPicElement = callMethod("getElement", tWndObj, "jc.photo1");
  tScoreElement = callMethod("getElement", tWndObj, "pic1.score");
  break;
case 2:
  tPicElement = callMethod("getElement", tWndObj, "jc.photo2");
  tScoreElement = callMethod("getElement", tWndObj, "pic2.score");
  break;
case 3:
  tPicElement = callMethod("getElement", tWndObj, "jc.photo3");
  tScoreElement = callMethod("getElement", tWndObj, "pic3.score");
  break;
case 4:
  tPicElement = callMethod("getElement", tWndObj, "jc.photo4");
  tScoreElement = callMethod("getElement", tWndObj, "pic4.score");
  break;
  }

  if (lingoBinary("lte", tIndex, meProp(_me, "m_ar_photos").count)) {
  callMethod("feedImage", tPicElement, meProp(_me, "m_ar_photos")[tIndex].image)
  callMethod("setText", tScoreElement, meProp(_me, "m_ar_photos")[tIndex].score)
  } else {
  callMethod("feedImage", tPicElement, t_greenImage)
  callMethod("setText", tScoreElement, "")
  }

  if (lingoBinary("lte", meProp(_me, "m_offset"), 1)) {
  callMethod("deactivate", callMethod("getElement", tWndObj, "button.arrowprev.active"))
  continue;
  }

  if (lingoBinary("eq", meProp(_me, "m_currentView"), "vmk_jc_statistics.window")) {
  callMethod("deactivate", callMethod("getElement", tWndObj, "button.arrownext.active"))
  continue;
  }

  callMethod("Activate", callMethod("getElement", tWndObj, "button.arrowprev.active"))
  callMethod("Activate", callMethod("getElement", tWndObj, "button.arrownext.active"))
  }

}

