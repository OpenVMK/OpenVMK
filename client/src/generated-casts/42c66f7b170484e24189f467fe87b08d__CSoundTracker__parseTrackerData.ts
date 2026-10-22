// 42c66f7b170484e24189f467fe87b08d.cct / CSoundTracker / parseTrackerData

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function parseTrackerData(_me: LingoMe, a_sTrackerData: LingoValue) {
  if (callNamed("memberExists", a_sTrackerData)) {
  var t_rDocXML = callNamed("CreateXML");
  var t_mem = callNamed("member", callNamed("getmemnum", a_sTrackerData)).text;
  callMethod("open", t_rDocXML, t_mem)
  if (callMethod("Search", t_rDocXML, "type", "CHANNELS")) {
  var t_rSOundList = callMethod("GetNode", t_rDocXML);
  var t_iSoundCount = t_rSOundList.child.count;
  setMeProp(_me, "m_mpSoundData", new LingoPropList([]));
  for (var i = 1; i <= t_iSoundCount; ++i) {
  var t_mpChild = t_rSOundList.child[i];
  var t_iChildCount = t_mpChild.child.count;
  var t_iChannelNo = callNamed("value", t_mpChild[symbol("param")]["ID"]);
  for (var e = 1; e <= t_iChildCount; ++e) {
  var t_sName = t_mpChild.child[e][symbol("param")]["NAME"];
  var t_sStart = t_mpChild.child[e][symbol("param")]["START"];
  var t_sType = t_mpChild.child[e][symbol("param")]["TYPE"];
  var t_iLoopFreq = callNamed("value", t_mpChild.child[e][symbol("param")]["LOOPFREQ"]);
  var t_iPanFreq = callNamed("value", t_mpChild.child[e][symbol("param")]["PANFREQ"]);
  var t_iVolFreq = callNamed("value", t_mpChild.child[e][symbol("param")]["VOLFREQ"]);
  var t_iLength = callNamed("value", t_mpChild.child[e][symbol("param")]["PREF"]);
  var t_arOneShot = callNamed("value", t_mpChild.child[e][symbol("param")]["ONESHOT"]);
  if (callMethod("findPos", meProp(_me, "m_mpSoundData"), t_sStart)) {
  callMethod("add", meProp(_me, "m_mpSoundData")[t_sStart], new LingoList([t_sName, t_iChannelNo, t_sType, t_iLength]))
  } else {
  meProp(_me, "m_mpSoundData")[t_sStart] = new LingoList([]);
  callMethod("add", meProp(_me, "m_mpSoundData")[t_sStart], new LingoList([t_sName, t_iChannelNo, t_sType, t_iLength]))
  }

  switch (t_sType) {
case "music":
case "fx":
case "Music":
case "FX":
case "Fx":
case "sound":
  callMethod("addProp", meProp(_me, "m_mp_SndTypes"), t_sName, t_sType)
  break;
  break;
  break;
  break;
  break;
  break;
  }

  if ((lingoTruthy(callNamed("voidp", t_iLoopFreq)) ? 0 : 1)) {
  callMethod("setLoopFrequent", _me, t_sName, t_iChannelNo, t_iLoopFreq, t_sType)
  }

  if ((lingoTruthy(callNamed("voidp", t_arOneShot)) ? 0 : 1)) {
  callMethod("addProp", meProp(_me, "m_ar_OneShot"), t_sStart, new LingoList([new LingoList([t_sName, t_iChannelNo, t_sType, t_iLength]), t_arOneShot]))
  }

  if ((lingoTruthy(callNamed("voidp", t_iPanFreq)) ? 0 : 1)) {
  var t_iMin = t_iPanFreq[1];
  var t_iMax = t_iPanFreq[2];
  var t_iDuration = t_iPanFreq[3];
  callMethod("startPanLoop", _me, t_iChannelNo, t_iMin, t_iMax, t_iDuration, "Pan")
  }

  if ((lingoTruthy(callNamed("voidp", t_iVolFreq)) ? 0 : 1)) {
  t_iMin = t_iVolFreq[1];
  t_iMax = t_iVolFreq[2];
  t_iDuration = t_iVolFreq[3];
  callMethod("startPanLoop", _me, t_iChannelNo, t_iMin, t_iMax, t_iDuration, "Vol")
  }

  }

  }

  setMeProp(_me, "m_mpEndTime", callNamed("value", t_rSOundList.child[t_iSoundCount][symbol("param")]["TIME"]));
  if (callNamed("voidp", meProp(_me, "m_mpEndTime"))) {
  callNamed("put", "EndTime Not Set for sounds!")
  }

  callMethod("timerStart", _me)
  }

  } else {
  }

}

