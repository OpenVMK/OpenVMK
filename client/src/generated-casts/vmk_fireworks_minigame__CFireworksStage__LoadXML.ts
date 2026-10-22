// vmk_fireworks_minigame.cct / CFireworksStage / LoadXML

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function LoadXML(_me: LingoMe, i_sDocument: LingoValue) {
  setMeProp(_me, "m_iChecksum", 0);
  setMeProp(_me, "m_iComboReward", 0);
  var t_rXML = callNamed("CreateXML", callNamed("getMember", i_sDocument).text);
  var tRoot = callMethod("GetRoot", t_rXML);
  if (callMethod("Search", t_rXML, "type", "FIREWORKS", 0)) {
  var tRootXML = callNamed("CreateXML");
  callMethod("copy", tRootXML, callMethod("GetNode", t_rXML))
  setMeProp(_me, "m_sName", callMethod("GetParam", t_rXML, "STAGE"));
  setMeProp(_me, "m_iStartTime", callMethod("GetParam", t_rXML, "STARTTIME"));
  setMeProp(_me, "m_iQualifiedPercent", callNamed("value", callMethod("GetParam", t_rXML, "QUALIFIEDPERCENT")));
  callMethod("GetRoot", tRootXML)
  for (var tChild of tRootXML[1][symbol("child")].toArray()) {
  if (lingoBinary("eq", tChild[symbol("type")], "VISUAL")) {
  setMeProp(_me, "m_sVisualBackground", tChild[symbol("param")]["BACKGROUND"]);
  setMeProp(_me, "m_sVisualForegroundMask", tChild[symbol("param")]["FGMASK"]);
  setMeProp(_me, "m_sVisualLightMask", tChild[symbol("param")]["LIGHTMASK"]);
  setMeProp(_me, "m_sVisualInterfaceMask", tChild[symbol("param")]["INTERFACEMASK"]);
  setMeProp(_me, "m_iVisualBufferHeight", callNamed("value", tChild[symbol("param")]["BUFFERHEIGHT"]));
  setMeProp(_me, "m_iVisualFlashBrightness", callNamed("value", tChild[symbol("param")]["FLASHBRIGHTNESS"]));
  setMeProp(_me, "m_iVisualFlashDim", callNamed("value", tChild[symbol("param")]["FLASHDIM"]));
  setMeProp(_me, "m_sDescription", tChild[symbol("param")]["DESCRIPTION"]);
  setMeProp(_me, "m_sDescription2", tChild[symbol("param")]["DESCRIPTION2"]);
  setMeProp(_me, "m_fVisualIconSize", float(1));
  }

  if (lingoBinary("eq", tChild[symbol("type")], "THREEDEE")) {
  setMeProp(_me, "m_f3DViewPlaneDistance", callNamed("value", tChild[symbol("param")]["VPD"]));
  setMeProp(_me, "m_f3DNearClip", callNamed("value", tChild[symbol("param")]["NEARCLIP"]));
  setMeProp(_me, "m_f3DFarClip", callNamed("value", tChild[symbol("param")]["FARCLIP"]));
  setMeProp(_me, "m_f3DViewMu", callNamed("value", tChild[symbol("param")]["MU"]));
  setMeProp(_me, "m_i3DParticleLimit", callNamed("value", tChild[symbol("param")]["PARTICLELIMIT"]));
  setMeProp(_me, "m_i3DEmitterLimit", callNamed("value", tChild[symbol("param")]["EMITTERLIMIT"]));
  setMeProp(_me, "m_f3DGravity", callNamed("value", tChild[symbol("param")]["GRAVITY"]));
  }

  if (lingoBinary("eq", tChild[symbol("type")], "LAUNCH")) {
  setMeProp(_me, "m_fLaunchZTilt", callNamed("value", tChild[symbol("param")]["ZTILT"]));
  setMeProp(_me, "m_fLaunchSidewaysRandom", callNamed("value", tChild[symbol("param")]["SIDEWAYSRANDOM"]));
  setMeProp(_me, "m_fLaunchZRandom", callNamed("value", tChild[symbol("param")]["ZRANDOM"]));
  }

  if (lingoBinary("eq", tChild[symbol("type")], "LOOKNFEEL")) {
  setMeProp(_me, "m_iLookFeelInstructionsPause", callNamed("value", tChild[symbol("param")]["INSTRUCTIONSPAUSE"]));
  setMeProp(_me, "m_iLookFeelLevelChangePause", callNamed("value", tChild[symbol("param")]["LEVELCHANGEPAUSE"]));
  setMeProp(_me, "m_iLookFeelGameOverPause", callNamed("value", tChild[symbol("param")]["GAMEOVERPAUSE"]));
  setMeProp(_me, "m_iLookFeelHighScorePause", callNamed("value", tChild[symbol("param")]["HIGHSCOREPAUSE"]));
  setMeProp(_me, "m_iLookFeelNumHighScores", callNamed("value", tChild[symbol("param")]["NUMHIGHSCORES"]));
  }

  if (lingoBinary("eq", tChild[symbol("type")], "SELECTOR")) {
  setMeProp(_me, "m_ar_mp_selector", new LingoList([]));
  for (var i = 1; i <= callMethod("count", tChild[symbol("child")]); ++i) {
  var tEntry = tChild[symbol("child")][i];
  switch (tEntry[symbol("type")]) {
case "ICON":
  callMethod("append", meProp(_me, "m_ar_mp_selector"), new LingoPropList([symbol("type"), tEntry[symbol("param")]["TYPE"], symbol("name"), tEntry[symbol("param")]["NAME"]]))
  break;
  }

  }

  }

  if (lingoBinary("eq", tChild[symbol("type")], "LEVEL")) {
  setMeProp(_me, "m_sMusic", tChild[symbol("param")]["MUSIC"]);
  setMeProp(_me, "m_iComboReward", callNamed("value", tChild[symbol("param")]["COMBOREWARD"]));
  }

  }

  setMeProp(_me, "m_iChecksum", callNamed("bitXor", meProp(_me, "m_iChecksum"), meProp(_me, "m_iMagic")));
  }

}

