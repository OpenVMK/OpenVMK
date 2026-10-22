// 42c66f7b170484e24189f467fe87b08d.cct / CSoundChannelAllocator / PlaySound

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PlaySound(_me: LingoMe, _this: LingoValue, a_mpSndData: LingoValue) {
  var t_SndObj = a_mpSndData.input;
  var t_sParam = callMethod("GetParameter", t_SndObj);
  switch (t_sParam) {
case "pass":
case undefined:
  for (var i = 1; i <= meProp(_me, "m_mpSndChannels").count; ++i) {
  var t_bStatus = callMethod("GetStatus", meProp(_me, "m_mpSndChannels")[i]);
  if (lingoBinary("eq", t_bStatus, 0)) {
  callMethod("PlaySound", meProp(_me, "m_mpSndChannels")[i], t_SndObj)
  a_mpSndData["output"] = meProp(_me, "m_mpSndChannels")[i];
  return a_mpSndData;
  }

  }

  break;
case "cut":
  var t_arReservation = new LingoList([]);
  for (var i = 1; i <= meProp(_me, "m_mpSndChannels").count; ++i) {
  t_bStatus = callMethod("GetStatus", meProp(_me, "m_mpSndChannels")[i]);
  if (lingoBinary("eq", t_bStatus, 0)) {
  callMethod("PlaySound", meProp(_me, "m_mpSndChannels")[i], t_SndObj)
  a_mpSndData["output"] = meProp(_me, "m_mpSndChannels")[i];
  return a_mpSndData;
  continue;
  }

  callMethod("add", t_arReservation, t_bStatus)
  }

  var t_arReservation2 = callMethod("duplicate", t_arReservation);
  callMethod("sort", t_arReservation)
  var t_iChannelToCut = callMethod("findPos", t_arReservation2, t_arReservation[1]);
  callMethod("PlaySound", meProp(_me, "m_mpSndChannels")[t_iChannelToCut], t_SndObj)
  a_mpSndData["output"] = meProp(_me, "m_mpSndChannels")[t_iChannelToCut];
  return a_mpSndData;
case "queue":
  t_arReservation = new LingoList([]);
  for (var i = 1; i <= meProp(_me, "m_mpSndChannels").count; ++i) {
  t_bStatus = callMethod("GetStatus", meProp(_me, "m_mpSndChannels")[i]);
  if (lingoBinary("eq", t_bStatus, 0)) {
  callMethod("PlaySound", meProp(_me, "m_mpSndChannels")[i], t_SndObj)
  a_mpSndData["output"] = meProp(_me, "m_mpSndChannels")[i];
  return a_mpSndData;
  continue;
  }

  callMethod("add", t_arReservation, t_bStatus)
  }

  t_arReservation2 = callMethod("duplicate", t_arReservation);
  callMethod("sort", t_arReservation)
  t_iChannelToCut = callMethod("findPos", t_arReservation2, t_arReservation[1]);
  callMethod("PlaySound", meProp(_me, "m_mpSndChannels")[t_iChannelToCut], t_SndObj, "queue")
  a_mpSndData["output"] = meProp(_me, "m_mpSndChannels")[t_iChannelToCut];
  return a_mpSndData;
  break;
  }

}

