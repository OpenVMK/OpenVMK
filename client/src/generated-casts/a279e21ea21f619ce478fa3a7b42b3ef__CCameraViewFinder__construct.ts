// a279e21ea21f619ce478fa3a7b42b3ef.cct / CCameraViewFinder / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  var tW = 184;
  var tH = 123;
  setMeProp(_me, "pOffset", callNamed("rect", 0, 0, tW, tH));
  setMeProp(_me, "cameraLens", callNamed("image", tW, tH, 32));
  setMeProp(_me, "greyCamera", callNamed("image", tW, tH, 8, callNamed("member", "sepia_palette_camera")));
  setMeProp(_me, "pBlack", callNamed("image", tW, tH, 32));
  callMethod("fill", meProp(_me, "pBlack"), meProp(_me, "pBlack").rect, new LingoPropList([symbol("shapeType"), symbol("rect"), symbol("color"), callNamed("rgb", "#000000")]))
  setMeProp(_me, "m_sCameraWindowName", "VMKCamera");
  setMeProp(_me, "m_sViewFinderName", "camera.picture");
  setMeProp(_me, "m_bActive", 0);
}

