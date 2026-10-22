// vmk_fireworks_minigame.cct / CFireworksGameComponent / InitGame

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function InitGame(_me: LingoMe) {
  callNamed("put", "CFireworksGameComponent::InitGame - begin")
  if ((lingoTruthy(meProp(_me, "m_initialized")) ? 0 : 1)) {
  setMeProp(_me, "m_particleSystem", callNamed("createObject", "Particle.System", "Particle System Class"));
  callMethod("initParticleSystem", meProp(_me, "m_particleSystem"))
  callMethod("setParticleLimit", meProp(_me, "m_particleSystem"), 0)
  callMethod("setEmitterLimit", meProp(_me, "m_particleSystem"), 0)
  callMethod("setGravity", meProp(_me, "m_particleSystem"), callNamed("vector", -float(14), 0, 0))
  setMeProp(_me, "m_rFireworksEngine", callNamed("createObject", "FWEngine", "CFireworksEngineInterface"));
  callMethod("SetParticleSystem", meProp(_me, "m_rFireworksEngine"), meProp(_me, "m_particleSystem"))
  callMethod("SetAutoExplode", meProp(_me, "m_rFireworksEngine"), 0)
  setMeProp(_me, "fViewTheta", float(0));
  setMeProp(_me, "fViewOmega", float(0));
  setMeProp(_me, "fViewMu", 40);
  setMeProp(_me, "pView", callNamed("new", callNamed("script", "Simple 3D View Class"), meProp(_me, "fViewTheta"), meProp(_me, "fViewOmega"), meProp(_me, "fViewMu"), 300));
  callMethod("setNearClipDistance", meProp(_me, "pView"), 1)
  callMethod("setFarClipDistance", meProp(_me, "pView"), 1)
  setMeProp(_me, "pPipeline", callNamed("new", callNamed("script", "3D Particle System Pipeline Class")));
  callMethod("setView", meProp(_me, "pPipeline"), meProp(_me, "pView"))
  var t_ar_particleTypes = callNamed("getVariableValue", "particle_types");
  if (callNamed("voidp", t_ar_particleTypes)) {
  callNamed("error", _me, "particle_types variable is invalid.", symbol("construct"))
  }

  callNamed("removeObject", "spark4")
  var t_spark4 = callNamed("createObject", "spark4", "SoftSprite Class");
  callMethod("setImage", t_spark4, callNamed("member", "Test Spark 4").image)
  setMeProp(_me, "m_mp_sparkList", new LingoPropList(["Test Spark 4", t_spark4]));
  var c = 0;
  for (var ttype of t_ar_particleTypes.toArray()) {
  var tPStyle = callNamed("getVariableValue", ttype);
  if (callNamed("voidp", tPStyle)) {
  return callNamed("error", _me, lingoBinary("join", ttype, " variable is invalid."), symbol("construct"));
  }

  for (var tSpr of tPStyle[symbol("spriteList")].toArray()) {
  if ((lingoTruthy(tSpr[symbol("loop")]) ? 0 : 1)) {
  if ((lingoTruthy(meProp(_me, "m_mp_sparkList")[tSpr[symbol("sprite")]]) ? 0 : 1)) {
  callNamed("createObject", lingoBinary("join", "fwspark:", c), "SoftSprite Class")
  var tSpark = callNamed("getObject", lingoBinary("join", "fwspark:", c));
  callMethod("setImage", tSpark, callNamed("member", tSpr[symbol("sprite")]).image)
  meProp(_me, "m_mp_sparkList")[tSpr[symbol("sprite")]] = tSpark;
  c = lingoBinary("add", c, 1);
  }

  }

  }

  }

  var t_bufImg = callNamed("image", theProperty("stage").image.width, theProperty("stage").image.height, 24);
  callMethod("fill", t_bufImg, 0, 0, t_bufImg.width, t_bufImg.height, new LingoPropList([symbol("color"), callNamed("color", 0, 0, 0)]))
  setMeProp(_me, "m_viewImg", callMethod("duplicate", t_bufImg));
  setMeProp(_me, "m_bufMember", callNamed("member", "ViewBuffer"));
  setThePropOf(meProp(_me, "m_bufMember"), "image", meProp(_me, "m_viewImg"));
  setMeProp(_me, "m_bgRegPoint", callNamed("point", 0, 0));
  setThePropOf(meProp(_me, "m_bufMember"), "regPoint", meProp(_me, "m_bgRegPoint"));
  setMeProp(_me, "m_viewImgSprite", callNamed("sprite", callNamed("reserveSprite", callMethod("getID", _me))));
  setThePropOf(meProp(_me, "m_viewImgSprite"), "member", meProp(_me, "m_bufMember"));
  setThePropOf(meProp(_me, "m_viewImgSprite"), "ink", 0);
  setThePropOf(meProp(_me, "m_viewImgSprite"), "loc", callNamed("point", 0, 0));
  setThePropOf(meProp(_me, "m_viewImgSprite"), "locZ", -float(103));
  setThePropOf(meProp(_me, "m_viewImgSprite"), "cursor", 200);
  setThePropOf(meProp(_me, "m_viewImgSprite"), "width", meProp(_me, "m_bufMember").image.width);
  setThePropOf(meProp(_me, "m_viewImgSprite"), "height", meProp(_me, "m_bufMember").image.height);
  setMeProp(_me, "m_softBuffer", callNamed("createObject", "SoftBuffer", "SoftBuffer Class"));
  callMethod("setBuffer", meProp(_me, "m_softBuffer"), t_bufImg)
  setMeProp(_me, "m_ClearImage", callMethod("duplicate", t_bufImg));
  callMethod("useTransparentCopyClear", meProp(_me, "m_softBuffer"), meProp(_me, "m_ClearImage"), 50)
  callNamed("receiveUpdate", callMethod("getID", _me))
  setMeProp(_me, "m_initialized", 1);
  }

  if (lingoBinary("neq", callNamed("getThread", "minigame"), 0)) {
  callMethod("StartMinigameEngine", callMethod("getComponent", callNamed("getThread", "minigame")))
  }

}

