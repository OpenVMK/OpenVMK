// minigame_engine.cct / CGameComponent / calculateChecksum

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function calculateChecksum(_me: LingoMe) {
  /* global */ var g_profMGEngine = globalVar("g_profMGEngine");
  /* global */ var g_profMGEProcess = globalVar("g_profMGEProcess");
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_rCurrentTurn"))) ? 0 : 1)) {
  if (meProp(_me, "m_bDump")) {
  callNamed("put", lingoBinary("joinPad", "turn", callMethod("GetNumber", meProp(_me, "m_rCurrentTurn"))))
  }

  var checksum = callMethod("IterateSeed", meProp(_me, "m_rQuickRandom"), callMethod("GetNumber", meProp(_me, "m_rCurrentTurn")));
  if (meProp(_me, "m_bDump")) {
  callNamed("put", lingoBinary("joinPad", "seed", checksum))
  var i = 1;
  }

  for (var Iterator of meProp(_me, "m_mp_objects").toArray()) {
  var tDumpStr = "";
  var counter = 1;
  checksum = lingoBinary("add", checksum, lingoBinary("mul", callMethod("GetParam", Iterator, "ObjectCode"), counter));
  if (meProp(_me, "m_bDump")) {
  tDumpStr = lingoBinary("join", tDumpStr, callMethod("GetParam", Iterator, "ObjectCode"));
  }

  counter = lingoBinary("add", counter, 1);
  checksum = lingoBinary("add", checksum, lingoBinary("mul", callMethod("GetParam", Iterator, "Reference"), counter));
  if (meProp(_me, "m_bDump")) {
  tDumpStr = lingoBinary("join", lingoBinary("join", tDumpStr, ","), callMethod("GetParam", Iterator, "Reference"));
  }

  counter = lingoBinary("add", counter, 1);
  checksum = lingoBinary("add", checksum, lingoBinary("mul", callMethod("GetParam", Iterator, "Owner"), counter));
  if (meProp(_me, "m_bDump")) {
  tDumpStr = lingoBinary("join", lingoBinary("join", tDumpStr, ","), callMethod("GetParam", Iterator, "Owner"));
  }

  counter = lingoBinary("add", counter, 1);
  checksum = lingoBinary("add", checksum, lingoBinary("mul", callMethod("GetParam", Iterator, "Team"), counter));
  if (meProp(_me, "m_bDump")) {
  tDumpStr = lingoBinary("join", lingoBinary("join", tDumpStr, ","), callMethod("GetParam", Iterator, "Team"));
  }

  counter = lingoBinary("add", counter, 1);
  var vPos = callMethod("GetParam", Iterator, "WorldPosition");
  checksum = lingoBinary("add", checksum, lingoBinary("mul", callNamed("integer", vPos.x), counter));
  if (meProp(_me, "m_bDump")) {
  tDumpStr = lingoBinary("join", lingoBinary("join", tDumpStr, ","), callNamed("integer", vPos.x));
  }

  counter = lingoBinary("add", counter, 1);
  checksum = lingoBinary("add", checksum, lingoBinary("mul", callNamed("integer", vPos.y), counter));
  if (meProp(_me, "m_bDump")) {
  tDumpStr = lingoBinary("join", lingoBinary("join", tDumpStr, ","), callNamed("integer", vPos.y));
  }

  counter = lingoBinary("add", counter, 1);
  checksum = lingoBinary("add", checksum, lingoBinary("mul", callNamed("integer", vPos.z), counter));
  if (meProp(_me, "m_bDump")) {
  tDumpStr = lingoBinary("join", lingoBinary("join", tDumpStr, ","), callNamed("integer", vPos.z));
  }

  counter = lingoBinary("add", counter, 1);
  checksum = lingoBinary("add", checksum, lingoBinary("mul", callNamed("integer", callMethod("GetParam", Iterator, "Direction")), counter));
  if (meProp(_me, "m_bDump")) {
  tDumpStr = lingoBinary("join", lingoBinary("join", tDumpStr, ","), callNamed("integer", callMethod("GetParam", Iterator, "Direction")));
  }

  counter = lingoBinary("add", counter, 1);
  var tGameParams = callMethod("GetParam", Iterator, "GameParams");
  if ((lingoTruthy(callNamed("voidp", tGameParams)) ? 0 : 1)) {
  for (var tInt of tGameParams.toArray()) {
  checksum = lingoBinary("add", checksum, lingoBinary("mul", callNamed("integer", tInt), counter));
  if (meProp(_me, "m_bDump")) {
  tDumpStr = lingoBinary("join", lingoBinary("join", tDumpStr, ","), callNamed("integer", tInt));
  }

  counter = lingoBinary("add", counter, 1);
  }

  }

  if (meProp(_me, "m_bDump")) {
  callNamed("put", lingoBinary("join", lingoBinary("joinPad", lingoBinary("join", lingoBinary("join", lingoBinary("join", "O", i), "-CS:"), checksum), "Parms:"), tDumpStr))
  i = lingoBinary("add", i, 1);
  }

  }

  return checksum;
  }

}

