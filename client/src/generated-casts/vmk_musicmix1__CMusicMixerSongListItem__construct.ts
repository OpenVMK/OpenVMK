// vmk_musicmix1.cct / CMusicMixerSongListItem / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_bSelected", 0);
  setMeProp(_me, "m_sWriterID", lingoBinary("join", "Music Mixer Song List Item n:", theProperty("milliSeconds")));
  callMethod("ResolveImage", _me)
  setMeProp(_me, "m_pImage", callMethod("duplicate", meProp(_me, "m_pBgImg").image));
  var tPlain = callNamed("getStructVariable", "struct.font.plain");
  var tMetrics = new LingoPropList([symbol("font"), callMethod("getaProp", tPlain, symbol("font")), symbol("fontStyle"), callMethod("getaProp", tPlain, symbol("fontStyle")), symbol("color"), callNamed("rgb", "#efefef"), symbol("bgColor"), callNamed("rgb", "#EEEEEE"), symbol("fixedLineSpace"), 15]);
  callNamed("createWriter", meProp(_me, "m_sWriterID"), tMetrics)
  callMethod("render", _me)
  setMeProp(_me, "m_bUpdate", 1);
}

