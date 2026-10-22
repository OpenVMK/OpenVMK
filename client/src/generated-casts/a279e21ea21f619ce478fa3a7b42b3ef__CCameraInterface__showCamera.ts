// a279e21ea21f619ce478fa3a7b42b3ef.cct / CCameraInterface / showCamera

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function showCamera(_me: LingoMe) {
  switch (meProp(_me, "m_view")) {
case symbol("camera"):
  if (callNamed("windowExists", meProp(_me, "m_sPicTitleWindowName"))) {
  callNamed("removeWindow", meProp(_me, "m_sPicTitleWindowName"))
  }

  if (callNamed("createWindow", meProp(_me, "m_sCameraWindowName"), "vmk_photo_camera.window")) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sCameraWindowName"));
  callMethod("setProperty", callMethod("getElement", tWndObj, "camera.picture"), symbol("visible"), 0)
  callMethod("setProperty", callMethod("getElement", tWndObj, "camera.picture"), symbol("blend"), 100)
  callMethod("setProperty", callMethod("getElement", tWndObj, "camera.picture"), symbol("ink"), 33)
  callMethod("center", tWndObj)
  callMethod("show", tWndObj)
  callMethod("registerClient", tWndObj, callMethod("getID", _me))
  callMethod("registerProcedure", tWndObj, symbol("eventProcCamera"), callMethod("getID", _me), symbol("mouseDown"))
  callMethod("setProperty", tWndObj, symbol("boundary"), callNamed("rect", -float(12), -float(26), lingoBinary("add", theProperty("stage").image.width, 12), lingoBinary("add", 575, 30)))
  callMethod("hide", callMethod("getElement", tWndObj, "camera.outoffilm"))
  callMethod("DisplayFilmAmount", _me, callMethod("GetFilmAmount", callMethod("getComponent", _me)))
  setMeProp(_me, "m_visible", 1);
  }

  break;
case symbol("pictitle"):
  if (callNamed("windowExists", meProp(_me, "m_sCameraWindowName"))) {
  callNamed("removeWindow", meProp(_me, "m_sCameraWindowName"))
  }

  if (callNamed("createWindow", meProp(_me, "m_sPicTitleWindowName"), "vmk_photo_picturetitle.window")) {
  tWndObj = callNamed("getWindow", meProp(_me, "m_sPicTitleWindowName"));
  callMethod("center", tWndObj)
  callMethod("show", tWndObj)
  callMethod("registerClient", tWndObj, callMethod("getID", _me))
  callMethod("registerProcedure", tWndObj, symbol("eventProcPictitle"), callMethod("getID", _me), symbol("keyDown"))
  callMethod("registerProcedure", tWndObj, symbol("eventProcPictitle"), callMethod("getID", _me), symbol("keyUp"))
  callMethod("registerProcedure", tWndObj, symbol("eventProcPictitle"), callMethod("getID", _me), symbol("mouseUp"))
  callMethod("feedImage", callMethod("getElement", tWndObj, "camera.picture"), callMethod("getImage", callMethod("getComponent", _me)))
  setMeProp(_me, "m_rCaptionCompose", callNamed("CreateCannedField", meProp(_me, "m_sPicTitleWindowName"), "camera.caption.input"));
  callMethod("setAllowEmpty", meProp(_me, "m_rCaptionCompose"), 1)
  setMeProp(_me, "m_visible", 1);
  }

  break;
case symbol("mickeyfound"):
  if (callNamed("windowExists", meProp(_me, "m_sMickeyWindowName"))) {
  callNamed("removeWindow", meProp(_me, "m_sMickeyWindowName"))
  }

  if (callNamed("createWindow", meProp(_me, "m_sMickeyWindowName"), "vmk_hidden_mickey_found.window")) {
  tWndObj = callNamed("getWindow", meProp(_me, "m_sMickeyWindowName"));
  callMethod("center", tWndObj)
  callMethod("show", tWndObj)
  callMethod("registerClient", tWndObj, callMethod("getID", _me))
  callMethod("registerProcedure", tWndObj, symbol("eventProcMickeyFound"), callMethod("getID", _me), symbol("mouseUp"))
  callMethod("feedImage", callMethod("getElement", tWndObj, "camera.picture"), callMethod("getImage", callMethod("getComponent", _me)))
  setMeProp(_me, "m_visible", 1);
  }

  break;
  }

}

