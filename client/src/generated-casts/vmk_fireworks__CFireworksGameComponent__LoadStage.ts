// vmk_fireworks.cct / CFireworksGameComponent / LoadStage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function LoadStage(_me: LingoMe, i_sName: LingoValue, i_iVersion: LingoValue, i_ar_params: LingoValue) {
  if (callNamed("voidp", meProp(_me, "m_stage"))) {
  setMeProp(_me, "m_initialized", 0);
  return callNamed("error", _me, "Fireworks client is in unprepared state!", symbol("LoadStage"));
  }

  callMethod("HideStageEnd", callMethod("getInterface", _me))
  setMeProp(_me, "m_iScore", callNamed("integer", callMethod("getaProp", i_ar_params, "s")));
  callMethod("setScore", callMethod("getInterface", _me), meProp(_me, "m_iScore"))
  callMethod("LoadXML", meProp(_me, "m_stage"), lingoBinary("join", lingoBinary("join", "stage.", i_sName), ".xml"))
  callMethod("loadServerParameters", meProp(_me, "m_stage"), i_ar_params)
  callMethod("SetSelector", callMethod("getInterface", _me), callMethod("GetSelectorContent", meProp(_me, "m_stage")))
  setMeProp(_me, "m_fIconSize", callMethod("GetVisualIconSize", meProp(_me, "m_stage")));
  setMeProp(_me, "m_maskMember", callNamed("getMember", callMethod("GetVisualForegroundMask", meProp(_me, "m_stage"))));
  setMeProp(_me, "m_selectorMember", callNamed("getMember", callMethod("GetVisualInterfaceMask", meProp(_me, "m_stage"))));
  setMeProp(_me, "m_flashMember", callNamed("getMember", callMethod("GetVisualLightMask", meProp(_me, "m_stage"))));
  setThePropOf(meProp(_me, "m_maskSprite"), "member", meProp(_me, "m_maskMember"));
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_maskMember"))) ? 0 : 1)) {
  setThePropOf(meProp(_me, "m_maskSprite"), "width", meProp(_me, "m_maskMember").image.width);
  setThePropOf(meProp(_me, "m_maskSprite"), "height", meProp(_me, "m_maskMember").image.height);
  }

  setThePropOf(meProp(_me, "m_selectorSprite"), "member", meProp(_me, "m_selectorMember"));
  var t_bufImg = callNamed("image", theProperty("stage").image.width, callMethod("GetVisualBufferHeight", meProp(_me, "m_stage")), 24);
  callMethod("fill", t_bufImg, 0, 0, t_bufImg.width, t_bufImg.height, new LingoPropList([symbol("color"), callNamed("color", 0, 0, 0)]))
  setMeProp(_me, "m_viewImg", callMethod("duplicate", t_bufImg));
  setMeProp(_me, "m_bufMember", callNamed("member", "ViewBuffer"));
  setThePropOf(meProp(_me, "m_bufMember"), "image", meProp(_me, "m_viewImg"));
  setMeProp(_me, "m_bgRegPoint", callNamed("getMember", callMethod("GetVisualBackground", meProp(_me, "m_stage"))).regPoint);
  setThePropOf(meProp(_me, "m_bufMember"), "regPoint", meProp(_me, "m_bgRegPoint"));
  setThePropOf(meProp(_me, "m_viewImgSprite"), "member", meProp(_me, "m_bufMember"));
  setThePropOf(meProp(_me, "m_viewImgSprite"), "ink", 0);
  setThePropOf(meProp(_me, "m_viewImgSprite"), "loc", callNamed("point", 0, 0));
  setThePropOf(meProp(_me, "m_viewImgSprite"), "cursor", 200);
  setThePropOf(meProp(_me, "m_viewImgSprite"), "width", meProp(_me, "m_viewImgSprite").member.image.width);
  setThePropOf(meProp(_me, "m_viewImgSprite"), "height", meProp(_me, "m_viewImgSprite").member.image.height);
  callMethod("setBuffer", meProp(_me, "m_softBuffer"), t_bufImg)
  setMeProp(_me, "m_ClearImage", callMethod("duplicate", t_bufImg));
  callMethod("copyPixels", meProp(_me, "m_ClearImage"), callNamed("getMember", callMethod("GetVisualBackground", meProp(_me, "m_stage"))).image, callNamed("rect", 1, 1, 800, callMethod("GetVisualBufferHeight", meProp(_me, "m_stage"))), callNamed("rect", 1, 1, 800, callMethod("GetVisualBufferHeight", meProp(_me, "m_stage"))))
  callMethod("useTransparentCopyClear", meProp(_me, "m_softBuffer"), meProp(_me, "m_ClearImage"), 30)
  callMethod("setParticleLimit", meProp(_me, "m_particleSystem"), callMethod("Get3DParticleLimit", meProp(_me, "m_stage")))
  callMethod("setEmitterLimit", meProp(_me, "m_particleSystem"), callMethod("Get3DEmitterLimit", meProp(_me, "m_stage")))
  callMethod("setGravity", meProp(_me, "m_particleSystem"), callNamed("vector", callMethod("Get3DGravity", meProp(_me, "m_stage")), 0, 0))
  setMeProp(_me, "fViewTheta", float(0));
  setMeProp(_me, "fViewOmega", float(0));
  setMeProp(_me, "fViewMu", callMethod("Get3DViewMu", meProp(_me, "m_stage")));
  setMeProp(_me, "pView", callNamed("new", callNamed("script", "Simple 3D View Class"), meProp(_me, "fViewTheta"), meProp(_me, "fViewOmega"), meProp(_me, "fViewMu"), callMethod("Get3DViewPlaneDistance", meProp(_me, "m_stage"))));
  callMethod("setNearClipDistance", meProp(_me, "pView"), callMethod("Get3DNearClip", meProp(_me, "m_stage")))
  callMethod("setFarClipDistance", meProp(_me, "pView"), callMethod("Get3DFarClip", meProp(_me, "m_stage")))
  callMethod("setView", meProp(_me, "pPipeline"), meProp(_me, "pView"))
  callMethod("_SendStageLoaded", callMethod("getHandler", callNamed("getThread", "minigame")))
  callMethod("switchState", _me, symbol("waitforserver"))
  setMeProp(_me, "m_iShotCount", 0);
  setMeProp(_me, "m_ar_currentCombination", new LingoList([]));
}

