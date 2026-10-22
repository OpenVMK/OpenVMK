// vmk_junglecruise_minigame.cct / CJungleCruiseComponent / CheckFrameHit

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CheckFrameHit(_me: LingoMe, i_rCamera: LingoValue) {
  var tHitList = new LingoList([]);
  for (var tAnimal of callMethod("GetVisibleAnimalList", meProp(_me, "m_animalMgr")).toArray()) {
  if ((lingoTruthy(callNamed("voidp", callMethod("GetVisual", tAnimal))) ? 0 : 1)) {
  var tCamSpr = callMethod("getSprite", i_rCamera);
  var tAnimalSpr = callMethod("getSprite", callMethod("GetVisual", tAnimal));
  if (lingoBinary("and", callMethod("intersects", tCamSpr, tAnimalSpr), lingoBinary("neq", callMethod("GetParam", tAnimal, "State"), symbol("leaving")))) {
  var tCameraRect = tCamSpr.rect;
  var tAnimalRect = tAnimalSpr.rect;
  var tCamCenter = callNamed("vector", lingoBinary("div", lingoBinary("add", tCameraRect.left, tCameraRect.right), 2), lingoBinary("div", lingoBinary("add", tCameraRect.top, tCameraRect.bottom), 2), 0);
  var tAnimalCenter = callNamed("vector", lingoBinary("div", lingoBinary("add", tAnimalRect.left, tAnimalRect.right), 2), lingoBinary("div", lingoBinary("add", tAnimalRect.top, tAnimalRect.bottom), 2), 0);
  var tAccuracy = 0;
  var t2DDist = callNamed("integer", lingoBinary("sub", tAnimalCenter, tCamCenter).length);
  if (lingoBinary("gt", t2DDist, 99)) {
  t2DDist = 99;
  }

  tAccuracy = lingoBinary("sub", 100, t2DDist);
  if (lingoBinary("lt", tAccuracy, 1)) {
  tAccuracy = 1;
  }

  var tTime = callNamed("integer", lingoBinary("div", lingoBinary("mul", 100, callMethod("GetParam", tAnimal, "Time")), callMethod("GetParam", tAnimal, "FullTime")));
  callMethod("append", tHitList, new LingoPropList([symbol("ref"), callMethod("GetParam", tAnimal, "Reference"), symbol("distance"), 1, symbol("accuracy"), tAccuracy, symbol("time"), tTime]))
  }

  }

  }

  return tHitList;
}

