// vmk_pirates_minigame.cct / CPiratesVisualizerShip / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe) {
  /* global */ var g_profShipVisualizerAcc = globalVar("g_profShipVisualizerAcc");
  var tTime = theProperty("milliSeconds");
  var tMyObject = callMethod("getObject", _me);
  var tLastMove = callMethod("GetParam", tMyObject, "LastMove");
  var tDt = lingoBinary("div", lingoBinary("sub", tTime, tLastMove), float(1000));
  var tPos = callMethod("GetParam", tMyObject, "WorldPosition");
  var tdir = lingoBinary("add", callMethod("GetParam", tMyObject, "Direction"), 1);
  var tTeam = callMethod("GetParam", tMyObject, "Team");
  var tstate = callMethod("GetParam", tMyObject, "State");
  var tVelocity = callMethod("GetParam", tMyObject, "Velocity");
  if (lingoBinary("gt", tdir, 360)) {
  tdir = 360;
  }

  if (lingoBinary("lt", tdir, 1)) {
  tdir = 1;
  }

  callMethod("SetGraphic", _me, tMyObject, tdir, tTeam)
  if (callNamed("voidp", meProp(_me, "m_vLocalPosition"))) {
  setMeProp(_me, "m_vLocalPosition", tPos);
  }

  if (callMethod("getSyncState", meProp(_me, "m_rMGE"))) {
  setMeProp(_me, "m_vLocalPosition", tPos);
  setMeProp(_me, "m_vLocalPosition", callMethod("add", meProp(_me, "m_vLocalPosition"), callMethod("multiply", tVelocity, lingoBinary("div", tDt, callMethod("GetSubturnSpacing", meProp(_me, "m_rMGE"))))));
  } else {
  setMeProp(_me, "m_vLocalPosition", meProp(_me, "m_vLocalPosition"));
  }

  setMeProp(_me, "m_sineOffset2", lingoBinary("add", meProp(_me, "m_sineOffset2"), 0.03));
  if (lingoBinary("gt", meProp(_me, "m_sineOffset2"), lingoBinary("mul", float(2), callNamed("pi")))) {
  setMeProp(_me, "m_sineOffset2", float(0));
  }

  var tWaveOffset = lingoBinary("mul", callNamed("sin", lingoBinary("add", lingoBinary("div", meProp(_me, "m_vLocalPosition").x, 2300), meProp(_me, "m_sineOffset2"))), 100);
  var tRotation = callNamed("sin", meProp(_me, "m_sineOffset1"));
  var tloc = callNamed("ProjectAxonometricPosition", callNamed("point", lingoBinary("add", meProp(_me, "m_vLocalPosition").x, tWaveOffset), lingoBinary("add", meProp(_me, "m_vLocalPosition").y, tWaveOffset)));
  var tInvincible = callNamed("TestBit", tstate, meProp(_me, "m_INVINCIBILITYBIT"));
  setThePropOf(meProp(_me, "m_rSprites")[1], "loc", tloc);
  setThePropOf(meProp(_me, "m_rSprites")[1], "rotation", tRotation);
  setThePropOf(meProp(_me, "m_rSprites")[2], "loc", tloc);
  setThePropOf(meProp(_me, "m_rSprites")[2], "rotation", tRotation);
  if (tInvincible) {
  setThePropOf(meProp(_me, "m_rSprites")[1], "blend", 50);
  setThePropOf(meProp(_me, "m_rSprites")[2], "blend", 50);
  } else {
  setThePropOf(meProp(_me, "m_rSprites")[1], "blend", 100);
  setThePropOf(meProp(_me, "m_rSprites")[2], "blend", 100);
  }

  if (meProp(_me, "m_bMyShip")) {
  var tmember = undefined;
  if (lingoBinary("eq", meProp(_me, "m_iMyTeam"), 1)) {
  var tOffset = callNamed("integer", lingoBinary("mul", meProp(_me, "m_fReloadStatus"), meProp(_me, "m_ar_rMyShipRed").count));
  if (lingoBinary("lt", tOffset, 1)) {
  tOffset = 1;
  }

  tmember = meProp(_me, "m_ar_rMyShipRed")[tOffset];
  } else {
  tOffset = callNamed("integer", lingoBinary("mul", meProp(_me, "m_fReloadStatus"), meProp(_me, "m_ar_rMyShipBlue").count));
  if (lingoBinary("lt", tOffset, 1)) {
  tOffset = 1;
  }

  tmember = meProp(_me, "m_ar_rMyShipBlue")[tOffset];
  }

  if (lingoBinary("neq", meProp(_me, "m_rSprites")[4].member, tmember)) {
  setThePropOf(meProp(_me, "m_rSprites")[4], "member", tmember);
  }

  setThePropOf(meProp(_me, "m_rSprites")[4], "loc", callNamed("point", tloc.locH, lingoBinary("sub", tloc.locV, 55)));
  }

  if ((lingoTruthy(meProp(_me, "m_bOwnerWritten")) ? 0 : 1)) {
  var tWrName = lingoBinary("join", "ShipNameWriter", callMethod("GetNewReference", callMethod("getComponent", callNamed("getThread", "piratesminigame"))));
  var tPlain = callNamed("getStructVariable", "struct.font.plain");
  var tMetrics = new LingoPropList([symbol("font"), callMethod("getaProp", tPlain, symbol("font")), symbol("fontStyle"), callMethod("getaProp", tPlain, symbol("fontStyle")), symbol("color"), callNamed("rgb", 250, 250, 250), symbol("bgColor"), callNamed("rgb", 0, 0, 0), symbol("fixedLineSpace"), 15]);
  callNamed("createWriter", tWrName, tMetrics)
  var tWriter = callNamed("getWriter", tWrName);
  var tOwner = callMethod("GetParam", callMethod("getObject", _me), "Owner");
  var tImg = callNamed("image", 0, 0, 8);
  if (lingoBinary("neq", tOwner, -float(1))) {
  var tName = callMethod("getaProp", callMethod("GetParticipantlist", meProp(_me, "m_rMGE")), tOwner);
  } else {
  tName = callNamed("getText", "pirates_computer_player_name");
  }

  tImg = callMethod("render", tWriter, tName);
  setThePropOf(meProp(_me, "m_rOwnerDisplayMember"), "image", tImg);
  setThePropOf(meProp(_me, "m_rSprites")[5], "member", meProp(_me, "m_rOwnerDisplayMember"));
  setMeProp(_me, "m_sPlayerName", tName);
  callNamed("removeWriter", tWrName)
  setMeProp(_me, "m_bOwnerWritten", 1);
  }

  setThePropOf(meProp(_me, "m_rSprites")[5], "loc", callNamed("point", tloc.locH, lingoBinary("sub", tloc.locV, 55)));
  var tFloatingWreck = callNamed("TestBit", tstate, meProp(_me, "m_FLOATINGWRECKBIT"));
  var tDestroyed = callNamed("TestBit", tstate, meProp(_me, "m_DESTROYEDBIT"));
  if (lingoBinary("and", (lingoTruthy(tFloatingWreck) ? 0 : 1), tDestroyed)) {
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_rSprites")[4].member)) ? 0 : 1)) {
  setThePropOf(meProp(_me, "m_rSprites")[4], "member", undefined);
  }

  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_rSprites")[5].member)) ? 0 : 1)) {
  setThePropOf(meProp(_me, "m_rSprites")[5], "member", undefined);
  }

  }

  setThePropOf(meProp(_me, "m_rSprites")[6], "loc", tloc);
  callMethod("SprZToScreenSpace", _me, new LingoList([meProp(_me, "m_rSprites")[1], meProp(_me, "m_rSprites")[2], meProp(_me, "m_rSprites")[6]]), 0)
  callMethod("SprZToFixed", _me, new LingoList([meProp(_me, "m_rSprites")[4], meProp(_me, "m_rSprites")[5]]), callNamed("vector", 500, 500, 10000))
  setThePropOf(meProp(_me, "m_rSprites")[6], "locZ", lingoBinary("sub", meProp(_me, "m_rSprites")[6].locZ, 1));
  setGlobal("g_profShipVisualizerAcc", lingoBinary("add", globalVar("g_profShipVisualizerAcc"), lingoBinary("sub", theProperty("milliSeconds"), tTime)));
}

