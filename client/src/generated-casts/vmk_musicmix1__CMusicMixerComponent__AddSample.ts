// vmk_musicmix1.cct / CMusicMixerComponent / AddSample

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function AddSample(_me: LingoMe, a_iTrack: LingoValue, a_iSlot: LingoValue) {
  if (lingoBinary("and", (lingoTruthy(callNamed("voidp", a_iTrack)) ? 0 : 1), (lingoTruthy(callNamed("voidp", a_iSlot)) ? 0 : 1))) {
  callMethod("playBackControl", _me, "Stop")
  var t_iNextPos = lingoBinary("add", a_iSlot, 1);
  var t_iPrevPos = lingoBinary("sub", a_iSlot, 1);
  var t_iPos1 = callMethod("findPos", meProp(_me, "m_mp_LongSamples")[a_iTrack], t_iPrevPos);
  var t_iPos2 = callMethod("findPos", meProp(_me, "m_mp_LongSamples")[a_iTrack], a_iSlot);
  var t_iPos3 = callMethod("findPos", meProp(_me, "m_mp_LongSamples")[a_iTrack], t_iNextPos);
  var t_iPos4 = callMethod("findPos", meProp(_me, "m_mp_LongSamples")[a_iTrack], lingoBinary("add", t_iNextPos, 1));
  if (lingoBinary("gt", t_iPos1, 0)) {
  var t1 = meProp(_me, "m_mp_LongSamples")[a_iTrack][t_iPos1];
  } else {
  t1 = callNamed("getUniqueID");
  }

  if (lingoBinary("gt", t_iPos2, 0)) {
  var t2 = meProp(_me, "m_mp_LongSamples")[a_iTrack][t_iPos2];
  } else {
  t2 = callNamed("getUniqueID");
  }

  if (lingoBinary("gt", t_iPos3, 0)) {
  var t3 = meProp(_me, "m_mp_LongSamples")[a_iTrack][t_iPos3];
  } else {
  t3 = callNamed("getUniqueID");
  }

  if (lingoBinary("gt", t_iPos4, 0)) {
  var t4 = meProp(_me, "m_mp_LongSamples")[a_iTrack][t_iPos4];
  } else {
  t4 = callNamed("getUniqueID");
  }

  if (lingoBinary("eq", meProp(_me, "m_iSampleLength"), 2)) {
  if (lingoBinary("eq", t1, t2)) {
  callNamed("put", 1)
  callMethod("deleteAt", meProp(_me, "m_mp_LongSamples")[a_iTrack], t_iPos1)
  meProp(_me, "m_mp_TrackData")[a_iTrack][t_iPrevPos] = 0;
  callMethod("ChangeImage", _me._interface, a_iTrack, t_iPrevPos)
  t_iPos2 = callMethod("findPos", meProp(_me, "m_mp_LongSamples")[a_iTrack], a_iSlot);
  callMethod("deleteAt", meProp(_me, "m_mp_LongSamples")[a_iTrack], t_iPos2)
  meProp(_me, "m_mp_TrackData")[a_iTrack][a_iSlot] = 0;
  callMethod("ChangeImage", _me._interface, a_iTrack, a_iSlot)
  meProp(_me, "m_mp_TrackData")[a_iTrack][a_iSlot] = meProp(_me, "m_rCurrentSample");
  callMethod("ChangeImage", _me._interface, a_iTrack, a_iSlot, meProp(_me, "m_colInstrument"), meProp(_me, "m_imgSample"), meProp(_me, "m_ImgSymbol"))
  t_iPos1 = callMethod("findPos", meProp(_me, "m_mp_LongSamples")[a_iTrack], t_iPrevPos);
  t_iPos2 = callMethod("findPos", meProp(_me, "m_mp_LongSamples")[a_iTrack], a_iSlot);
  t_iPos3 = callMethod("findPos", meProp(_me, "m_mp_LongSamples")[a_iTrack], t_iNextPos);
  if (lingoBinary("gt", t_iPos1, 0)) {
  t1 = meProp(_me, "m_mp_LongSamples")[a_iTrack][t_iPos1];
  } else {
  t1 = callNamed("getUniqueID");
  }

  if (lingoBinary("gt", t_iPos2, 0)) {
  t2 = meProp(_me, "m_mp_LongSamples")[a_iTrack][t_iPos2];
  } else {
  t2 = callNamed("getUniqueID");
  }

  if (lingoBinary("gt", t_iPos3, 0)) {
  t3 = meProp(_me, "m_mp_LongSamples")[a_iTrack][t_iPos3];
  } else {
  t3 = callNamed("getUniqueID");
  }

  }

  if (lingoBinary("eq", t2, t3)) {
  callNamed("put", 2)
  callMethod("deleteAt", meProp(_me, "m_mp_LongSamples")[a_iTrack], t_iPos3)
  meProp(_me, "m_mp_TrackData")[a_iTrack][t_iNextPos] = 0;
  callMethod("ChangeImage", _me._interface, a_iTrack, t_iNextPos)
  t_iPos2 = callMethod("findPos", meProp(_me, "m_mp_LongSamples")[a_iTrack], a_iSlot);
  callMethod("deleteAt", meProp(_me, "m_mp_LongSamples")[a_iTrack], t_iPos2)
  meProp(_me, "m_mp_TrackData")[a_iTrack][a_iSlot] = 0;
  callMethod("ChangeImage", _me._interface, a_iTrack, a_iSlot)
  meProp(_me, "m_mp_TrackData")[a_iTrack][a_iSlot] = meProp(_me, "m_rCurrentSample");
  callMethod("ChangeImage", _me._interface, a_iTrack, a_iSlot, meProp(_me, "m_colInstrument"), meProp(_me, "m_imgSample"), meProp(_me, "m_ImgSymbol"))
  }

  meProp(_me, "m_mp_TrackData")[a_iTrack][a_iSlot] = meProp(_me, "m_rCurrentSample");
  callMethod("ChangeImage", _me._interface, a_iTrack, a_iSlot, meProp(_me, "m_colInstrument"), meProp(_me, "m_imgSample"), meProp(_me, "m_ImgSymbol"))
  } else {
  if (lingoBinary("eq", meProp(_me, "m_iSampleLength"), 4)) {
  if (lingoBinary("lt", t_iNextPos, 17)) {
  if (lingoBinary("eq", t1, t2)) {
  callMethod("deleteAt", meProp(_me, "m_mp_LongSamples")[a_iTrack], t_iPos1)
  meProp(_me, "m_mp_TrackData")[a_iTrack][t_iPrevPos] = 0;
  callMethod("ChangeImage", _me._interface, a_iTrack, t_iPrevPos)
  t_iPos2 = callMethod("findPos", meProp(_me, "m_mp_LongSamples")[a_iTrack], a_iSlot);
  callMethod("deleteAt", meProp(_me, "m_mp_LongSamples")[a_iTrack], t_iPos2)
  meProp(_me, "m_mp_TrackData")[a_iTrack][a_iSlot] = 0;
  callMethod("ChangeImage", _me._interface, a_iTrack, a_iSlot)
  t_iPos1 = callMethod("findPos", meProp(_me, "m_mp_LongSamples")[a_iTrack], t_iPrevPos);
  t_iPos2 = callMethod("findPos", meProp(_me, "m_mp_LongSamples")[a_iTrack], a_iSlot);
  t_iPos3 = callMethod("findPos", meProp(_me, "m_mp_LongSamples")[a_iTrack], t_iNextPos);
  t_iPos4 = callMethod("findPos", meProp(_me, "m_mp_LongSamples")[a_iTrack], lingoBinary("add", t_iNextPos, 1));
  if (lingoBinary("gt", t_iPos1, 0)) {
  t1 = meProp(_me, "m_mp_LongSamples")[a_iTrack][t_iPos1];
  } else {
  t1 = callNamed("getUniqueID");
  }

  if (lingoBinary("gt", t_iPos2, 0)) {
  t2 = meProp(_me, "m_mp_LongSamples")[a_iTrack][t_iPos2];
  } else {
  t2 = callNamed("getUniqueID");
  }

  if (lingoBinary("gt", t_iPos3, 0)) {
  t3 = meProp(_me, "m_mp_LongSamples")[a_iTrack][t_iPos3];
  } else {
  t3 = callNamed("getUniqueID");
  }

  if (lingoBinary("gt", t_iPos4, 0)) {
  t4 = meProp(_me, "m_mp_LongSamples")[a_iTrack][t_iPos4];
  } else {
  t4 = callNamed("getUniqueID");
  }

  }

  if (lingoBinary("eq", t2, t3)) {
  meProp(_me, "m_mp_TrackData")[a_iTrack][t_iNextPos] = -float(1);
  callMethod("deleteAt", meProp(_me, "m_mp_LongSamples")[a_iTrack], t_iPos3)
  callMethod("ChangeImage", _me._interface, a_iTrack, t_iNextPos)
  t_iPos2 = callMethod("findPos", meProp(_me, "m_mp_LongSamples")[a_iTrack], a_iSlot);
  meProp(_me, "m_mp_TrackData")[a_iTrack][a_iSlot] = -float(1);
  callMethod("deleteAt", meProp(_me, "m_mp_LongSamples")[a_iTrack], t_iPos2)
  callMethod("ChangeImage", _me._interface, a_iTrack, a_iSlot)
  t_iPos1 = callMethod("findPos", meProp(_me, "m_mp_LongSamples")[a_iTrack], t_iPrevPos);
  t_iPos2 = callMethod("findPos", meProp(_me, "m_mp_LongSamples")[a_iTrack], a_iSlot);
  t_iPos3 = callMethod("findPos", meProp(_me, "m_mp_LongSamples")[a_iTrack], t_iNextPos);
  t_iPos4 = callMethod("findPos", meProp(_me, "m_mp_LongSamples")[a_iTrack], lingoBinary("add", t_iNextPos, 1));
  if (lingoBinary("gt", t_iPos1, 0)) {
  t1 = meProp(_me, "m_mp_LongSamples")[a_iTrack][t_iPos1];
  } else {
  t1 = callNamed("getUniqueID");
  }

  if (lingoBinary("gt", t_iPos2, 0)) {
  t2 = meProp(_me, "m_mp_LongSamples")[a_iTrack][t_iPos2];
  } else {
  t2 = callNamed("getUniqueID");
  }

  if (lingoBinary("gt", t_iPos3, 0)) {
  t3 = meProp(_me, "m_mp_LongSamples")[a_iTrack][t_iPos3];
  } else {
  t3 = callNamed("getUniqueID");
  }

  if (lingoBinary("gt", t_iPos4, 0)) {
  t4 = meProp(_me, "m_mp_LongSamples")[a_iTrack][t_iPos4];
  } else {
  t4 = callNamed("getUniqueID");
  }

  }

  if (lingoBinary("eq", t3, t4)) {
  callMethod("deleteAt", meProp(_me, "m_mp_LongSamples")[a_iTrack], t_iPos3)
  meProp(_me, "m_mp_TrackData")[a_iTrack][t_iNextPos] = 0;
  callMethod("ChangeImage", _me._interface, a_iTrack, t_iNextPos)
  t_iPos4 = callMethod("findPos", meProp(_me, "m_mp_LongSamples")[a_iTrack], lingoBinary("add", t_iNextPos, 1));
  callMethod("deleteAt", meProp(_me, "m_mp_LongSamples")[a_iTrack], t_iPos4)
  meProp(_me, "m_mp_TrackData")[a_iTrack][lingoBinary("add", t_iNextPos, 1)] = 0;
  callMethod("ChangeImage", _me._interface, a_iTrack, lingoBinary("add", t_iNextPos, 1))
  }

  var t_sID = callNamed("getUniqueID");
  callMethod("addProp", meProp(_me, "m_mp_LongSamples")[a_iTrack], a_iSlot, t_sID)
  callMethod("addProp", meProp(_me, "m_mp_LongSamples")[a_iTrack], t_iNextPos, t_sID)
  meProp(_me, "m_mp_TrackData")[a_iTrack][t_iNextPos] = -float(1);
  callMethod("ChangeImage", _me._interface, a_iTrack, t_iNextPos, meProp(_me, "m_colInstrument"), meProp(_me, "m_imgLongSample2"), meProp(_me, "m_ImgSymbol"))
  meProp(_me, "m_mp_TrackData")[a_iTrack][a_iSlot] = meProp(_me, "m_rCurrentSample");
  callMethod("ChangeImage", _me._interface, a_iTrack, a_iSlot, meProp(_me, "m_colInstrument"), meProp(_me, "m_imgLongSample1"), meProp(_me, "m_ImgSymbol"))
  } else {
  callNamed("put", "Too Long")
  }

  }

  }

  }

}

