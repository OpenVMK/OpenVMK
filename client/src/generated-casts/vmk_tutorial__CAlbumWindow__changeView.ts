// vmk_tutorial.cct / CAlbumWindow / changeView

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function changeView(_me: LingoMe, tView: LingoValue) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWindowTitle"));
  var tLastView = meProp(_me, "m_currentView");
  if (lingoBinary("eq", tWndObj, 0)) {
  if ((lingoTruthy(callNamed("createWindow", meProp(_me, "m_sWindowTitle"), "vmk_jc_main.window")) ? 0 : 1)) {
  return callNamed("error", _me, "Failed to create Photo Album Basic Window!", symbol("construct"));
  } else {
  var tWindow = callNamed("getWindow", meProp(_me, "m_sWindowTitle"));
  if ((lingoTruthy(callMethod("merge", tWindow, "vmk_jc_photos.window")) ? 0 : 1)) {
  return callNamed("error", _me, "Failed to merge Photo Album Window!", symbol("construct"));
  }

  callMethod("registerProcedure", tWindow, symbol("EventProcAlbum"), callMethod("getID", _me), symbol("mouseUp"))
  }

  }

  if (lingoBinary("neq", tLastView, tView)) {
  callMethod("unmerge", tWndObj)
  callMethod("merge", tWndObj, tView)
  setMeProp(_me, "m_currentView", tView);
  }

  switch (meProp(_me, "m_currentView")) {
case "vmk_jc_photos.window":
  callMethod("fixAntialising", _me, "pic1.score", 0, 0)
  callMethod("fixAntialising", _me, "pic2.score", 0, 0)
  callMethod("fixAntialising", _me, "pic3.score", 0, 0)
  callMethod("fixAntialising", _me, "pic4.score", 0, 0)
  callMethod("fixAntialising", _me, "jc.window.hd", 0, "Jungle Cruise Scores", 1)
  break;
case "vmk_jc_statistics.window":
  callMethod("updateTotalScore", _me)
  callMethod("fixAntialising", _me, "jc.statistics.hd1", 0, "YOUR TOTAL SCORE")
  callMethod("fixAntialising", _me, "jc.total.score", 0, meProp(_me, "m_iTotalScore"))
  break;
  }

}

