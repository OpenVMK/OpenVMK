// d0e535313898676eb605277339b50f27.cct / CBodypartClass_lh / animate

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function animate(_me: LingoMe) {
  if ((lingoTruthy(meProp(_me, "m_bAnimation")) ? 0 : 1)) {
  return "";
  }

  var tdir = lingoBinary("add", meProp(_me, "m_arFlipList")[lingoBinary("add", meProp(_me, "m_iBodyDir"), 1)], meProp(_me, "m_bAnimation")[symbol("offD")][meProp(_me, "m_iAnimFrame")]);
  if (lingoBinary("gt", tdir, 7)) {
  tdir = lingoBinary("sub", tdir, lingoBinary("mod", tdir, 7));
  } else {
  if (lingoBinary("lt", tdir, 0)) {
  tdir = lingoBinary("add", lingoBinary("add", 7, tdir), 1);
  }

  }

  setThePropOf(_me, "m_iAnimatedFrame", meProp(_me, "m_iAnimFrame"));
  tdir = meProp(_me, "m_arFlipList")[lingoBinary("add", tdir, 1)];
  setMeProp(_me, "m_iXFix", meProp(_me, "m_bAnimation")[symbol("offX")][meProp(_me, "m_iAnimFrame")]);
  setMeProp(_me, "m_iYFix", meProp(_me, "m_bAnimation")[symbol("offY")][meProp(_me, "m_iAnimFrame")]);
  var tMemName = lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", meProp(_me, "m_bAnimation")[symbol("act")][meProp(_me, "m_iAnimFrame")], "_"), meProp(_me, "m_sPart")), "_"), meProp(_me, "m_iModel")), "_"), tdir), "_"), meProp(_me, "m_bAnimation")[symbol("frm")][meProp(_me, "m_iAnimFrame")]);
  setMeProp(_me, "m_iAnimFrame", lingoBinary("add", meProp(_me, "m_iAnimFrame"), 1));
  if (lingoBinary("gt", meProp(_me, "m_iAnimFrame"), meProp(_me, "m_iTotalFrame"))) {
  setMeProp(_me, "m_iAnimFrame", 1);
  }

  return tMemName;
}

