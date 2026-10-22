// a279e21ea21f619ce478fa3a7b42b3ef.cct / CCameraInterface / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_visible", 0);
  setMeProp(_me, "m_procedureReceiverList", new LingoList([]));
  callNamed("registerMessage", symbol("ui_camera"), callMethod("getID", _me), symbol("showHideCamera"))
  callNamed("registerMessage", symbol("camera_add_receiver"), callMethod("getID", _me), symbol("addToReceiverList"))
  setMeProp(_me, "m_sCameraWindowName", "CameraViewFinder");
  setMeProp(_me, "m_sPicTitleWindowName", "CameraPictureTitle");
  setMeProp(_me, "m_sMickeyWindowName", "CameraMickeyFound");
  setMeProp(_me, "m_rCaptionCompose", undefined);
  setMeProp(_me, "m_view", symbol("camera"));
  callNamed("registerMessage", "room_leave", callMethod("getID", _me), symbol("hideCamera"))
  callNamed("registerMessage", symbol("MickeyInPicture"), callMethod("getID", _me), symbol("MickeyInPicture"))
  return 1;
}

