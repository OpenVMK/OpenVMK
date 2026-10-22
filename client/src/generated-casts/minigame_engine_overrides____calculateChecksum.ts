// minigame_engine_overrides.cct /  / calculateChecksum

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function calculateChecksum(_me: LingoMe) {
  if ((lingoTruthy(callNamed("voidp", _me.m_rCurrentTurn)) ? 0 : 1)) {
  if (_me.m_bDump) {
  callNamed("put", lingoBinary("joinPad", "turn", callMethod("GetNumber", _me.m_rCurrentTurn)))
  }

  var tDumpStr = callMethod("IterateSeed", _me.m_rQuickRandom, callMethod("GetNumber", _me.m_rCurrentTurn));
  if (_me.m_bDump) {
  callNamed("put", lingoBinary("joinPad", "seed", tDumpStr))
  var tIsThere = 1;
  }

  for (var tInt of _me.m_mp_objects.toArray()) {
  var counter = "";
  var checksum = 1;
  tDumpStr = lingoBinary("add", tDumpStr, lingoBinary("mul", callMethod("GetParam", tInt, "ObjectCode"), checksum));
  if (_me.m_bDump) {
  counter = lingoBinary("join", counter, callMethod("GetParam", tInt, "ObjectCode"));
  }

  checksum = lingoBinary("add", checksum, 1);
  tDumpStr = lingoBinary("add", tDumpStr, lingoBinary("mul", callMethod("GetParam", tInt, "Reference"), checksum));
  if (_me.m_bDump) {
  counter = lingoBinary("join", lingoBinary("join", counter, ","), callMethod("GetParam", tInt, "Reference"));
  }

  checksum = lingoBinary("add", checksum, 1);
  tDumpStr = lingoBinary("add", tDumpStr, lingoBinary("mul", callMethod("GetParam", tInt, "Owner"), checksum));
  if (_me.m_bDump) {
  counter = lingoBinary("join", lingoBinary("join", counter, ","), callMethod("GetParam", tInt, "Owner"));
  }

  checksum = lingoBinary("add", checksum, 1);
  tDumpStr = lingoBinary("add", tDumpStr, lingoBinary("mul", callMethod("GetParam", tInt, "Team"), checksum));
  if (_me.m_bDump) {
  counter = lingoBinary("join", lingoBinary("join", counter, ","), callMethod("GetParam", tInt, "Team"));
  }

  checksum = lingoBinary("add", checksum, 1);
  var tGameParams = callMethod("GetParam", tInt, "WorldPosition");
  tDumpStr = lingoBinary("add", tDumpStr, lingoBinary("mul", callNamed("integer", tGameParams.x), checksum));
  if (_me.m_bDump) {
  counter = lingoBinary("join", lingoBinary("join", counter, ","), callNamed("integer", tGameParams.x));
  }

  checksum = lingoBinary("add", checksum, 1);
  tDumpStr = lingoBinary("add", tDumpStr, lingoBinary("mul", callNamed("integer", tGameParams.y), checksum));
  if (_me.m_bDump) {
  counter = lingoBinary("join", lingoBinary("join", counter, ","), callNamed("integer", tGameParams.y));
  }

  checksum = lingoBinary("add", checksum, 1);
  tDumpStr = lingoBinary("add", tDumpStr, lingoBinary("mul", callNamed("integer", tGameParams.z), checksum));
  if (_me.m_bDump) {
  counter = lingoBinary("join", lingoBinary("join", counter, ","), callNamed("integer", tGameParams.z));
  }

  checksum = lingoBinary("add", checksum, 1);
  tDumpStr = lingoBinary("add", tDumpStr, lingoBinary("mul", callNamed("integer", callMethod("GetParam", tInt, "Direction")), checksum));
  if (_me.m_bDump) {
  counter = lingoBinary("join", lingoBinary("join", counter, ","), callNamed("integer", callMethod("GetParam", tInt, "Direction")));
  }

  checksum = lingoBinary("add", checksum, 1);
  var vPos = callMethod("GetParam", tInt, "GameParams");
  if ((lingoTruthy(callNamed("voidp", vPos)) ? 0 : 1)) {
  for (var Iterator of vPos.toArray()) {
  tDumpStr = lingoBinary("add", tDumpStr, lingoBinary("mul", callNamed("integer", Iterator), checksum));
  if (_me.m_bDump) {
  counter = lingoBinary("join", lingoBinary("join", counter, ","), callNamed("integer", Iterator));
  }

  checksum = lingoBinary("add", checksum, 1);
  }

  }

  if (_me.m_bDump) {
  callNamed("put", lingoBinary("join", lingoBinary("joinPad", lingoBinary("join", lingoBinary("join", lingoBinary("join", "O", tIsThere), "-CS:"), tDumpStr), "Parms:"), counter))
  tIsThere = lingoBinary("add", tIsThere, 1);
  }

  }

  return tDumpStr;
  }

}

