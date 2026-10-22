// vmk_fireworks_minigame.cct / CFireworksGameComponent / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe) {
  if (meProp(_me, "m_prepared")) {
  var tTime = theProperty("milliSeconds");
  if (lingoBinary("eq", meProp(_me, "m_iGameState"), symbol("start"))) {
  setMeProp(_me, "m_iLastMilliseconds", tTime);
  }

  var tDt = lingoBinary("div", callNamed("float", lingoBinary("sub", tTime, meProp(_me, "m_iLastMilliseconds"))), float(1000));
  setMeProp(_me, "m_iLastMilliseconds", tTime);
  if (callNamed("windowExists", "Game_Status")) {
  callNamed("removeWindow", "Game_Status")
  }

  if (meProp(_me, "m_initialized")) {
  var tBrightness = lingoBinary("sub", meProp(_me, "m_flashSprite").blendLevel, callMethod("GetVisualFlashDim", meProp(_me, "m_stage")));
  if (lingoBinary("lt", tBrightness, 0)) {
  tBrightness = 0;
  }

  setThePropOf(meProp(_me, "m_flashSprite"), "blendLevel", tBrightness);
  var tNextState = meProp(_me, "m_iGameState");
  switch (meProp(_me, "m_iGameState")) {
case symbol("waitforserver"):
  break;
case symbol("start"):
  tNextState = symbol("waitforserver");
  break;
case symbol("play"):
  if (lingoBinary("neq", meProp(_me, "m_rWriterSprite").member.image.width, 0)) {
  setThePropOf(meProp(_me, "m_rWriterSprite").member, "image", callNamed("image", 0, 0, 32));
  }

  var t_ar_newFireworks = callMethod("getFireworksBetween", _me, meProp(_me, "m_fStateTime"), lingoBinary("add", meProp(_me, "m_fStateTime"), tDt));
  if (lingoBinary("gt", t_ar_newFireworks.count, 0)) {
  for (var tBombDesc of t_ar_newFireworks.toArray()) {
  callMethod("shootOne", _me, tBombDesc[symbol("f")], tBombDesc[symbol("pos")], tBombDesc[symbol("id")])
  callMethod("Shoot", meProp(_me, "m_rSoundPlayer"), callNamed("getMember", callMethod("GetBombSound", meProp(_me, "m_rFireworksEngine"), tBombDesc[symbol("f")], symbol("liftoff"))), callNamed("float", callNamed("random", 5)))
  }

  }

  var t_ar_newFwList = new LingoList([]);
  for (var tFw of meProp(_me, "m_ar_fwList").toArray()) {
  if ((lingoTruthy(callMethod("TimeToExplode", tFw[symbol("ref")])) ? 0 : 1)) {
  callMethod("append", t_ar_newFwList, tFw)
  continue;
  }

  if (callMethod("GetExploded", tFw[symbol("ref")])) {
  callMethod("SetFlash", _me, 1)
  setThePropOf(meProp(_me, "m_flashSprite"), "blendLevel", callMethod("GetVisualFlashBrightness", meProp(_me, "m_stage")));
  callMethod("Boom", meProp(_me, "m_rSoundPlayer"), callNamed("getMember", callMethod("GetBombSound", meProp(_me, "m_rFireworksEngine"), tFw[symbol("style")], symbol("Explode"))), callNamed("float", callNamed("random", 5)))
  callMethod("Crowd", meProp(_me, "m_rSoundPlayer"), symbol("positive"))
  continue;
  }

  callMethod("Crowd", meProp(_me, "m_rSoundPlayer"), symbol("negative"))
  }

  setMeProp(_me, "m_ar_fwList", t_ar_newFwList);
  if (lingoBinary("gt", meProp(_me, "m_fStateTime"), meProp(_me, "m_fLevelEnd"))) {
  callMethod("SendStageEnd", _me)
  setMeProp(_me, "m_bScoreSent", 1);
  callMethod("RemoveActionSprites", _me)
  tNextState = symbol("waitforserver");
  }

  break;
case symbol("nextlevel"):
  if ((lingoTruthy(callNamed("voidp", callMethod("GetLevel", meProp(_me, "m_stage")))) ? 0 : 1)) {
  callMethod("toggleStageInfo", callMethod("getInterface", _me))
  setMeProp(_me, "m_iCurrentLevel", lingoBinary("add", meProp(_me, "m_iCurrentLevel"), 1));
  var tWriter = callNamed("getWriter", meProp(_me, "m_sWriterName"));
  var t_sLevelText = lingoBinary("join", lingoBinary("join", callMethod("GetDescription", meProp(_me, "m_stage")), "\r"), callMethod("GetDescription2", meProp(_me, "m_stage")));
  var tImage = callMethod("render", tWriter, t_sLevelText);
  setThePropOf(meProp(_me, "m_rWriterSprite").member, "image", tImage);
  setThePropOf(meProp(_me, "m_rWriterSprite"), "width", tImage.width);
  setThePropOf(meProp(_me, "m_rWriterSprite"), "height", tImage.height);
  tNextState = symbol("startlevel");
  }

  break;
case symbol("startlevel"):
  setMeProp(_me, "m_fLevelEnd", callMethod("getLevelEnd", _me));
  if (lingoBinary("gte", meProp(_me, "m_fStateTime"), callMethod("GetStartTime", meProp(_me, "m_stage")))) {
  callMethod("toggleStageInfo", callMethod("getInterface", _me))
  tNextState = symbol("play");
  if (callMethod("get", callNamed("getObject", symbol("session")), "music")) {
  callMethod("music", meProp(_me, "m_rSoundPlayer"), callNamed("getMember", callMethod("GetMusic", meProp(_me, "m_stage"))))
  }

  }

  break;
case symbol("end"):
  tNextState = symbol("gameover");
  break;
case symbol("gameover"):
  if (lingoBinary("gt", meProp(_me, "m_fStateTime"), callMethod("GetLookFeelGameOverPause", meProp(_me, "m_stage")))) {
  tNextState = symbol("highscores");
  }

  break;
case symbol("highscores"):
  if (lingoBinary("gt", meProp(_me, "m_fStateTime"), callMethod("GetLookFeelHighScorePause", meProp(_me, "m_stage")))) {
  tNextState = symbol("exit");
  }

  break;
case symbol("exit"):
  setMeProp(_me, "m_initialized", 0);
  callMethod("UnprepareRoom", _me)
  callNamed("executeMessage", symbol("SendMinigameAction"), 2, new LingoList([]))
  tNextState = symbol("postexit");
  break;
case symbol("postexit"):
  break;
  }

  setMeProp(_me, "m_fStateTime", lingoBinary("add", meProp(_me, "m_fStateTime"), tDt));
  if (lingoBinary("neq", tNextState, meProp(_me, "m_iGameState"))) {
  callMethod("switchState", _me, tNextState)
  }

  if (meProp(_me, "m_prepared")) {
  callMethod("setViewAngle", meProp(_me, "pView"), meProp(_me, "fViewTheta"), meProp(_me, "fViewOmega"))
  callMethod("setView", meProp(_me, "pPipeline"), meProp(_me, "pView"))
  setMeProp(_me, "m_ar_visual", callMethod("Process", meProp(_me, "pPipeline"), callMethod("getAllParticles", meProp(_me, "m_particleSystem"))));
  var tScreenSizeX = theProperty("stage").image.width;
  var tScreenSizeY = theProperty("stage").image.height;
  var tCOP_X = lingoBinary("div", tScreenSizeX, 2);
  var tCOP_Y = lingoBinary("div", tScreenSizeY, 2);
  callMethod("clear", meProp(_me, "m_softBuffer"))
  var t_backBuffer = callMethod("getImage", meProp(_me, "m_softBuffer"));
  for (var tVis of meProp(_me, "m_ar_visual").toArray()) {
  var t_spriteName = tVis[1];
  var t_sprite = meProp(_me, "m_mp_sparkList")[t_spriteName];
  var tX = lingoBinary("sub", lingoBinary("add", tVis[2].x, tCOP_X), lingoBinary("div", callMethod("getWidth", t_sprite), 2));
  var tY = lingoBinary("sub", lingoBinary("add", tVis[2].y, tCOP_Y), lingoBinary("div", callMethod("getHeight", t_sprite), 2));
  callMethod("addPinBlit", t_sprite, tX, tY, t_backBuffer)
  }

  setThePropOf(meProp(_me, "m_bufMember"), "image", t_backBuffer);
  setThePropOf(meProp(_me, "m_bufMember"), "regPoint", meProp(_me, "m_bgRegPoint"));
  for (var i = 1; i <= meProp(_me, "m_ar_fwList").count; ++i) {
  tFw = meProp(_me, "m_ar_fwList")[i];
  var tWorldPos = callMethod("getPosition", tFw[symbol("ref")]);
  var tViewSpc = callMethod("transformToViewSpace", meProp(_me, "pView"), tWorldPos);
  if (callMethod("testClip", meProp(_me, "pView"), tViewSpc)) {
  var tScreenPos = callMethod("transformToProjected", meProp(_me, "pView"), tViewSpc);
  var tloc = callNamed("point", lingoBinary("add", tScreenPos.x, tCOP_X), lingoBinary("add", tScreenPos.y, tCOP_Y));
  callMethod("setFireworksActionSprite", callMethod("getInterface", _me), i, tloc, tFw[symbol("icon")], 1, meProp(_me, "m_fIconSize"))
  callMethod("setFireworksActionSpriteVicinity", callMethod("getInterface", _me), i, lingoBinary("div", callMethod("getAge", tFw[symbol("ref")]), callMethod("GetLagTime", tFw[symbol("ref")])))
  var tPercentLeft = lingoBinary("sub", callMethod("getAge", tFw[symbol("ref")]), lingoBinary("sub", callMethod("GetLagTime", tFw[symbol("ref")]), meProp(_me, "m_fWarningFlashTime")));
  if (lingoBinary("gt", tPercentLeft, float(0))) {
  callMethod("setWarningFlash", callMethod("getInterface", _me), i, lingoBinary("div", tPercentLeft, meProp(_me, "m_fWarningFlashTime")))
  continue;
  }

  callMethod("setWarningFlash", callMethod("getInterface", _me), i, float(0))
  }

  }

  for (var i = lingoBinary("add", meProp(_me, "m_ar_fwList").count, 1); i <= callMethod("getFireWorksActionSprites", callMethod("getInterface", _me)).count; ++i) {
  callMethod("setFireworksActionSprite", callMethod("getInterface", _me), i, callNamed("point", -float(1000), -float(1000)), undefined, 0, float(1))
  callMethod("setWarningFlash", callMethod("getInterface", _me), i, float(0))
  }

  callMethod("setScore", callMethod("getInterface", _me), meProp(_me, "m_iScore"))
  }

  }

  }

}

