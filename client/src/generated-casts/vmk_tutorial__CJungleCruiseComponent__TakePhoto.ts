// vmk_tutorial.cct / CJungleCruiseComponent / TakePhoto

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function TakePhoto(_me: LingoMe, i_rCamera: LingoValue) {
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_boat"))) ? 0 : 1)) {
  if (lingoBinary("eq", callMethod("GetParam", meProp(_me, "m_boat"), "Film"), 0)) {
  callMethod("SaySomething", meProp(_me, "m_hostCharacter"), "SN-youre_out_of_film", "You're out of film!")
  }

  if (lingoBinary("and", callMethod("ready", i_rCamera), lingoBinary("gt", callMethod("GetParam", meProp(_me, "m_boat"), "Film"), 0))) {
  callMethod("ClearHideables", meProp(_me, "m_spriteHider"))
  var t_ar_hideables = callMethod("GetHideables", callMethod("getInterface", _me));
  for (var tSpr of t_ar_hideables.toArray()) {
  callMethod("AddHideable", meProp(_me, "m_spriteHider"), tSpr)
  callNamed("put", callNamed("sprite", tSpr).member.name)
  }

  t_ar_hideables = callMethod("GetHideables", meProp(_me, "m_hostCharacter"));
  for (var tSpr of t_ar_hideables.toArray()) {
  callMethod("AddHideable", meProp(_me, "m_spriteHider"), tSpr)
  }

  callMethod("HideSprites", meProp(_me, "m_spriteHider"))
  callNamed("updateStage")
  callMethod("camera", meProp(_me, "m_rSoundPlayer"), callNamed("getMember", "JC-camera"))
  var tFrameID = meProp(_me, "m_idCounter");
  setMeProp(_me, "m_idCounter", lingoBinary("add", meProp(_me, "m_idCounter"), 1));
  var tHitList = callMethod("CheckFrameHit", _me, i_rCamera);
  var tScore = callMethod("Calculatescore", _me, tHitList);
  if (lingoBinary("gt", tHitList.count, 0)) {
  callMethod("SendHits", _me, tHitList, tFrameID)
  callMethod("SayPositive", meProp(_me, "m_hostCharacter"))
  for (var tHit of tHitList.toArray()) {
  callMethod("LeaveAnimal", meProp(_me, "m_animalMgr"), tHit.ref)
  }

  } else {
  var m_lastPhotoScore = 0;
  callMethod("SayNegative", meProp(_me, "m_hostCharacter"))
  }

  callMethod("DisplayPhotoScore", callMethod("getInterface", _me), tScore)
  var tMaxList = callMethod("duplicate", tHitList);
  for (var tHit of tMaxList.toArray()) {
  setThePropOf(tHit, "accuracy", 100);
  setThePropOf(tHit, "time", 100);
  }

  var tMaxScore = callMethod("Calculatescore", _me, tMaxList);
  if (lingoBinary("eq", tMaxScore, 0)) {
  var tQuality = 0;
  } else {
  tQuality = lingoBinary("div", lingoBinary("mul", tScore, float(1)), tMaxScore);
  }

  callMethod("DisplayFeedback", callMethod("getInterface", _me), tQuality)
  if (lingoBinary("neq", meProp(_me, "m_stage"), 0)) {
  if (lingoBinary("neq", callMethod("GetName", meProp(_me, "m_stage")), "tutorial")) {
  var tRect = callMethod("getSprite", i_rCamera).rect;
  var tImage = callNamed("image", lingoBinary("sub", tRect.right, tRect.left), lingoBinary("sub", tRect.bottom, tRect.top), 32);
  callMethod("copyPixels", tImage, theProperty("stage").image, callNamed("rect", 0, 0, lingoBinary("sub", tRect.right, tRect.left), lingoBinary("sub", tRect.bottom, tRect.top)), tRect)
  callMethod("append", meProp(_me, "m_ar_photoAlbum"), new LingoPropList([symbol("frameid"), tFrameID, symbol("image"), tImage, symbol("score"), 0]))
  callMethod("StartFilmWind", i_rCamera)
  var tFilm = callMethod("GetParam", meProp(_me, "m_boat"), "Film");
  tFilm = lingoBinary("sub", tFilm, 1);
  callMethod("SetParam", meProp(_me, "m_boat"), "Film", tFilm)
  callMethod("AddFrame", meProp(_me, "m_filmstrip"), tImage)
  }

  }

  callMethod("ShowSprites", meProp(_me, "m_spriteHider"))
  callNamed("updateStage")
  }

  }

  callMethod("updateScrollingFilm", callMethod("getInterface", _me), meProp(_me, "m_filmstrip"))
  callMethod("updatePowerups", callMethod("getInterface", _me))
}

