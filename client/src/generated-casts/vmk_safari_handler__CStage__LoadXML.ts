// vmk_safari_handler.cct / CStage / LoadXML

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function LoadXML(_me: LingoMe, i_sDocument: LingoValue) {
  var t_rXML = callNamed("CreateXML", callNamed("getMember", i_sDocument).text);
  var tRoot = callMethod("GetRoot", t_rXML);
  if (callMethod("Search", t_rXML, "type", "JUNGLECRUISE", 0)) {
  var tRootXML = callNamed("CreateXML");
  callMethod("copy", tRootXML, callMethod("GetNode", t_rXML))
  setMeProp(_me, "m_sName", callMethod("GetParam", t_rXML, "STAGE"));
  setMeProp(_me, "m_iStartTime", callNamed("value", callMethod("GetParam", t_rXML, "STARTTIME")));
  setMeProp(_me, "m_iEndTime", callNamed("value", callMethod("GetParam", t_rXML, "ENDTIME")));
  callMethod("GetRoot", tRootXML)
  if (callMethod("Search", tRootXML, "type", "VISUAL", 0)) {
  setMeProp(_me, "m_sRoomName", callMethod("GetParam", tRootXML, "NAME"));
  }

  callMethod("GetRoot", tRootXML)
  if (callMethod("Search", tRootXML, "type", "PARAMS", 0)) {
  setMeProp(_me, "m_sDirection", callMethod("GetParam", tRootXML, "DIRECTION"));
  setMeProp(_me, "m_bUseSpot", callNamed("value", callMethod("GetParam", tRootXML, "USESPOT")));
  setMeProp(_me, "m_sMusic", callMethod("GetParam", tRootXML, "MUSIC"));
  setMeProp(_me, "m_sAtmos", callMethod("GetParam", tRootXML, "ATMOSPHERE"));
  }

  if (callMethod("Search", tRootXML, "type", "BASERAIL", 1)) {
  meProp(_me, "m_splines")[1] = callNamed("createObject", symbol("random"), "CSpline3D");
  var tSplineType = callMethod("GetParam", tRootXML, "SPLINE");
  if (lingoBinary("eq", tSplineType, "Catmull-Rom")) {
  callMethod("SetCatmullRomInterpolation", meProp(_me, "m_splines")[1])
  }

  if (lingoBinary("eq", tSplineType, "CubicBezier")) {
  callMethod("SetCubicBezierInterpolation", meProp(_me, "m_splines")[1])
  }

  for (var i = 1; i <= callMethod("count", tRootXML); ++i) {
  var tKnot = tRootXML[i];
  callMethod("addControlPoint", meProp(_me, "m_splines")[1], callNamed("value", tKnot[symbol("param")]["POS"]))
  }

  }

  if (callMethod("Search", tRootXML, "type", "LEFTRAIL", 1)) {
  meProp(_me, "m_splines")[2] = callNamed("createObject", symbol("random"), "CSpline3D");
  tSplineType = callMethod("GetParam", tRootXML, "SPLINE");
  if (lingoBinary("eq", tSplineType, "Catmull-Rom")) {
  callMethod("SetCatmullRomInterpolation", meProp(_me, "m_splines")[2])
  }

  if (lingoBinary("eq", tSplineType, "CubicBezier")) {
  callMethod("SetCubicBezierInterpolation", meProp(_me, "m_splines")[2])
  }

  for (var i = 1; i <= callMethod("count", tRootXML); ++i) {
  tKnot = tRootXML[i];
  callMethod("addControlPoint", meProp(_me, "m_splines")[2], callNamed("value", tKnot[symbol("param")]["POS"]))
  }

  }

  if (callMethod("Search", tRootXML, "type", "RIGHTRAIL", 1)) {
  meProp(_me, "m_splines")[3] = callNamed("createObject", symbol("random"), "CSpline3D");
  tSplineType = callMethod("GetParam", tRootXML, "SPLINE");
  if (lingoBinary("eq", tSplineType, "Catmull-Rom")) {
  callMethod("SetCatmullRomInterpolation", meProp(_me, "m_splines")[3])
  }

  if (lingoBinary("eq", tSplineType, "CubicBezier")) {
  callMethod("SetCubicBezierInterpolation", meProp(_me, "m_splines")[3])
  }

  for (var i = 1; i <= callMethod("count", tRootXML); ++i) {
  tKnot = tRootXML[i];
  callMethod("addControlPoint", meProp(_me, "m_splines")[3], callNamed("value", tKnot[symbol("param")]["POS"]))
  }

  }

  callMethod("GetRoot", tRootXML)
  for (var tChild of tRootXML[1][symbol("child")].toArray()) {
  if (lingoBinary("eq", tChild[symbol("type")], "ANIMALS")) {
  var tSet = tChild[symbol("param")]["SET"];
  var tID = callNamed("integer", tChild[symbol("param")]["ID"]);
  var tSound = tChild[symbol("param")]["SOUND"];
  var tCurrentSet = new LingoPropList([symbol("name"), tSet, symbol("id"), tID, symbol("sound"), tSound, symbol("Spots"), new LingoList([])]);
  for (var i = 1; i <= callMethod("count", tChild[symbol("child")]); ++i) {
  var tSpot = tChild[symbol("child")][i];
  var tPosition = callNamed("value", tSpot[symbol("param")]["POS"]);
  var tTime = callNamed("value", tSpot[symbol("param")]["TIME"]);
  var tScale = callNamed("value", tSpot[symbol("param")]["SCALE"]);
  var tFlip = callNamed("value", tSpot[symbol("param")]["FLIP"]);
  callMethod("append", tCurrentSet.Spots, new LingoPropList([symbol("pos"), tPosition, symbol("time"), tTime, symbol("scale"), tScale, symbol("flip"), tFlip]))
  }

  callMethod("setaProp", meProp(_me, "m_mp_animalSets"), tID, tCurrentSet)
  }

  if (lingoBinary("eq", tChild[symbol("type")], "HAZARDS")) {
  for (var i = 1; i <= callMethod("count", tChild[symbol("child")]); ++i) {
  var tHazard = tChild[symbol("child")][i];
  switch (tHazard[symbol("type")]) {
case "ROCK":
  callMethod("append", meProp(_me, "m_ar_hazards"), new LingoPropList([symbol("type"), symbol("rock"), symbol("pos"), callNamed("value", tHazard[symbol("param")]["POS"])]))
  break;
  }

  }

  }

  if (lingoBinary("eq", tChild[symbol("type")], "POWERUPS")) {
  for (var i = 1; i <= callMethod("count", tChild[symbol("child")]); ++i) {
  var tPowerup = tChild[symbol("child")][i];
  switch (tPowerup[symbol("type")]) {
case "FUEL":
  callMethod("append", meProp(_me, "m_ar_powerups"), new LingoPropList([symbol("type"), symbol("fuel"), symbol("pos"), callNamed("value", tPowerup[symbol("param")]["POS"])]))
  break;
case "FILM":
  callMethod("append", meProp(_me, "m_ar_powerups"), new LingoPropList([symbol("type"), symbol("film"), symbol("pos"), callNamed("value", tPowerup[symbol("param")]["POS"])]))
  break;
  }

  }

  }

  }

  }

  if (lingoBinary("and", lingoBinary("and", (lingoTruthy(callNamed("voidp", meProp(_me, "m_splines")[1])) ? 0 : 1), (lingoTruthy(callNamed("voidp", meProp(_me, "m_splines")[2])) ? 0 : 1)), (lingoTruthy(callNamed("voidp", meProp(_me, "m_splines")[3])) ? 0 : 1))) {
  callMethod("FindBoundaries", _me)
  }

}

