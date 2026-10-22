// d0e535313898676eb605277339b50f27.cct / CMagicFactor / DrawPushTheTrashcan

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function DrawPushTheTrashcan(_me: LingoMe, a_Mem_AvatImage: LingoValue) {
  var t_iDir = meProp(_me, "m_arFlipList")[lingoBinary("add", meProp(_me, "m_iDir"), 1)];
  switch (meProp(_me, "m_sCarPantAction")) {
case "spk":
  setMeProp(_me, "m_bTrashCanTalkState", (lingoTruthy(meProp(_me, "m_bTrashCanTalkState")) ? 0 : 1));
  setMeProp(_me, "m_sCarPantAction", "drk");
  setMeProp(_me, "m_i_CarPantCounter", 0);
  break;
case "blk1":
  setMeProp(_me, "m_sCarPantAction", "blk");
  setMeProp(_me, "m_i_CarPantCounter", 0);
  break;
case "blk2":
  setMeProp(_me, "m_sCarPantAction", "std");
  setMeProp(_me, "m_i_CarPantCounter", 0);
  break;
case "wav":
  setMeProp(_me, "m_i_CarPantCounter", lingoBinary("add", meProp(_me, "m_i_CarPantCounter"), 1));
  if (lingoBinary("gt", meProp(_me, "m_i_CarPantCounter"), 1)) {
  setMeProp(_me, "m_i_CarPantCounter", 0);
  }

  break;
case "wlk":
  setMeProp(_me, "m_i_CarPantCounter", lingoBinary("add", meProp(_me, "m_i_CarPantCounter"), 1));
  if (lingoBinary("gt", meProp(_me, "m_i_CarPantCounter"), 3)) {
  setMeProp(_me, "m_i_CarPantCounter", 0);
  }

  break;
  default:
  setMeProp(_me, "m_i_CarPantCounter", 0);
  }

  var t_sCarPantAction = meProp(_me, "m_sCarPantAction");
  var t_sMemName = lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", t_sCarPantAction, "_npc_1_"), t_iDir), "_"), meProp(_me, "m_i_CarPantCounter"));
  if (callNamed("memberExists", t_sMemName)) {
  var t_rMem = callNamed("getMember", t_sMemName);
  } else {
  return 0;
  }

  if (callNamed("memberExists", lingoBinary("join", t_sMemName, "_a"))) {
  var t_rAlpha = callNamed("getMember", lingoBinary("join", t_sMemName, "_a"));
  } else {
  t_rAlpha = callMethod("extractAlpha", t_rMem.image);
  }

  return new LingoList([t_rMem.image, t_rAlpha, undefined]);
}

