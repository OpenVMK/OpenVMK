// vmk_junglecruise_minigame.cct / CJungleCruiseComponent / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  callNamed("put", "CJungleCruiseComponent::Construct - begin")
  callNamed("put", "Init variables")
  setMeProp(_me, "m_objAnimator", callNamed("createObject", symbol("temp"), "CAvatarAnimator"));
  setMeProp(_me, "m_ImgAvatar", undefined);
  setMeProp(_me, "m_stage", 0);
  setMeProp(_me, "m_initialized", 0);
  setMeProp(_me, "m_prepared", 0);
  setMeProp(_me, "m_hostCharacter", undefined);
  setMeProp(_me, "m_filmstrip", undefined);
  setMeProp(_me, "m_tutorial", undefined);
  setMeProp(_me, "m_spriteHider", undefined);
  setMeProp(_me, "m_ar_avatarFigure", undefined);
  setMeProp(_me, "m_rMotorSound", undefined);
  var m_rMusic = undefined;
  var m_rAtmosphere = undefined;
  var m_ar_rFX = new LingoList([]);
  setMeProp(_me, "m_soundUpdateFreq", 10);
  setMeProp(_me, "m_sdacc", 0);
  setMeProp(_me, "m_ar_animalscores", new LingoList([]));
  meProp(_me, "m_ar_animalscores")[1] = 100;
  meProp(_me, "m_ar_animalscores")[2] = 100;
  meProp(_me, "m_ar_animalscores")[3] = 500;
  meProp(_me, "m_ar_animalscores")[4] = 500;
  meProp(_me, "m_ar_animalscores")[5] = 250;
  meProp(_me, "m_ar_animalscores")[6] = 250;
  meProp(_me, "m_ar_animalscores")[7] = 300;
  meProp(_me, "m_ar_animalscores")[8] = 300;
  meProp(_me, "m_ar_animalscores")[9] = 300;
  meProp(_me, "m_ar_animalscores")[10] = 300;
  meProp(_me, "m_ar_animalscores")[11] = 300;
  meProp(_me, "m_ar_animalscores")[12] = 300;
  meProp(_me, "m_ar_animalscores")[13] = 300;
  meProp(_me, "m_ar_animalscores")[14] = 350;
  meProp(_me, "m_ar_animalscores")[15] = 350;
  meProp(_me, "m_ar_animalscores")[16] = 200;
  meProp(_me, "m_ar_animalscores")[17] = 200;
  meProp(_me, "m_ar_animalscores")[18] = 500;
  meProp(_me, "m_ar_animalscores")[19] = 500;
  meProp(_me, "m_ar_animalscores")[20] = 150;
  meProp(_me, "m_ar_animalscores")[21] = 150;
  meProp(_me, "m_ar_animalscores")[22] = 100;
  meProp(_me, "m_ar_animalscores")[23] = 100;
  meProp(_me, "m_ar_animalscores")[24] = 300;
  meProp(_me, "m_ar_animalscores")[25] = 300;
  meProp(_me, "m_ar_animalscores")[26] = 200;
  meProp(_me, "m_ar_animalscores")[27] = 200;
  meProp(_me, "m_ar_animalscores")[28] = 200;
  meProp(_me, "m_ar_animalscores")[29] = 200;
  meProp(_me, "m_ar_animalscores")[30] = 400;
  meProp(_me, "m_ar_animalscores")[31] = 400;
  meProp(_me, "m_ar_animalscores")[32] = 150;
  meProp(_me, "m_ar_animalscores")[33] = 150;
  meProp(_me, "m_ar_animalscores")[34] = 450;
  meProp(_me, "m_ar_animalscores")[35] = 450;
  meProp(_me, "m_ar_animalscores")[36] = 200;
  meProp(_me, "m_ar_animalscores")[37] = 200;
  meProp(_me, "m_ar_animalscores")[38] = 300;
  meProp(_me, "m_ar_animalscores")[39] = 300;
  meProp(_me, "m_ar_animalscores")[40] = 450;
  meProp(_me, "m_ar_animalscores")[41] = 450;
  meProp(_me, "m_ar_animalscores")[42] = 350;
  meProp(_me, "m_ar_animalscores")[43] = 350;
  meProp(_me, "m_ar_animalscores")[44] = 400;
  meProp(_me, "m_ar_animalscores")[45] = 400;
  meProp(_me, "m_ar_animalscores")[46] = 300;
  meProp(_me, "m_ar_animalscores")[47] = 100;
  meProp(_me, "m_ar_animalscores")[48] = 100;
  meProp(_me, "m_ar_animalscores")[49] = 100;
  meProp(_me, "m_ar_animalscores")[50] = 500;
  meProp(_me, "m_ar_animalscores")[51] = 500;
  meProp(_me, "m_ar_animalscores")[52] = 500;
  meProp(_me, "m_ar_animalscores")[53] = 250;
  meProp(_me, "m_ar_animalscores")[54] = 250;
  meProp(_me, "m_ar_animalscores")[55] = 250;
  meProp(_me, "m_ar_animalscores")[56] = 300;
  meProp(_me, "m_ar_animalscores")[57] = 300;
  meProp(_me, "m_ar_animalscores")[58] = 300;
  meProp(_me, "m_ar_animalscores")[59] = 300;
  meProp(_me, "m_ar_animalscores")[60] = 300;
  meProp(_me, "m_ar_animalscores")[61] = 300;
  meProp(_me, "m_ar_animalscores")[62] = 300;
  meProp(_me, "m_ar_animalscores")[63] = 300;
  meProp(_me, "m_ar_animalscores")[64] = 300;
  meProp(_me, "m_ar_animalscores")[65] = 300;
  meProp(_me, "m_ar_animalscores")[66] = 300;
  meProp(_me, "m_ar_animalscores")[67] = 300;
  meProp(_me, "m_ar_animalscores")[68] = 350;
  meProp(_me, "m_ar_animalscores")[69] = 350;
  meProp(_me, "m_ar_animalscores")[70] = 350;
  meProp(_me, "m_ar_animalscores")[71] = 200;
  meProp(_me, "m_ar_animalscores")[72] = 200;
  meProp(_me, "m_ar_animalscores")[73] = 200;
  meProp(_me, "m_ar_animalscores")[74] = 500;
  meProp(_me, "m_ar_animalscores")[75] = 500;
  meProp(_me, "m_ar_animalscores")[76] = 500;
  meProp(_me, "m_ar_animalscores")[77] = 150;
  meProp(_me, "m_ar_animalscores")[78] = 150;
  meProp(_me, "m_ar_animalscores")[79] = 150;
  meProp(_me, "m_ar_animalscores")[80] = 100;
  meProp(_me, "m_ar_animalscores")[81] = 100;
  meProp(_me, "m_ar_animalscores")[82] = 100;
  meProp(_me, "m_ar_animalscores")[83] = 300;
  meProp(_me, "m_ar_animalscores")[84] = 300;
  meProp(_me, "m_ar_animalscores")[85] = 300;
  meProp(_me, "m_ar_animalscores")[86] = 200;
  meProp(_me, "m_ar_animalscores")[87] = 200;
  meProp(_me, "m_ar_animalscores")[88] = 200;
  meProp(_me, "m_ar_animalscores")[89] = 200;
  meProp(_me, "m_ar_animalscores")[90] = 200;
  meProp(_me, "m_ar_animalscores")[91] = 200;
  meProp(_me, "m_ar_animalscores")[92] = 400;
  meProp(_me, "m_ar_animalscores")[93] = 400;
  meProp(_me, "m_ar_animalscores")[94] = 400;
  meProp(_me, "m_ar_animalscores")[95] = 150;
  meProp(_me, "m_ar_animalscores")[96] = 150;
  meProp(_me, "m_ar_animalscores")[97] = 150;
  meProp(_me, "m_ar_animalscores")[98] = 450;
  meProp(_me, "m_ar_animalscores")[99] = 450;
  meProp(_me, "m_ar_animalscores")[100] = 450;
  meProp(_me, "m_ar_animalscores")[101] = 200;
  meProp(_me, "m_ar_animalscores")[102] = 200;
  meProp(_me, "m_ar_animalscores")[103] = 200;
  meProp(_me, "m_ar_animalscores")[104] = 300;
  meProp(_me, "m_ar_animalscores")[105] = 300;
  meProp(_me, "m_ar_animalscores")[106] = 300;
  meProp(_me, "m_ar_animalscores")[107] = 450;
  meProp(_me, "m_ar_animalscores")[108] = 450;
  meProp(_me, "m_ar_animalscores")[109] = 450;
  meProp(_me, "m_ar_animalscores")[110] = 350;
  meProp(_me, "m_ar_animalscores")[111] = 350;
  meProp(_me, "m_ar_animalscores")[112] = 350;
  meProp(_me, "m_ar_animalscores")[113] = 400;
  meProp(_me, "m_ar_animalscores")[114] = 400;
  meProp(_me, "m_ar_animalscores")[115] = 400;
  callNamed("executeMessage", symbol("SetMinigameHandler"), "CJungleCruiseHandlerExtension")
  var t_Img = callNamed("image", 80, 160, 32);
  var t_rAlpha = callNamed("image", 80, 160, 8, symbol("grayscale"));
  callMethod("setAlpha", t_Img, t_rAlpha)
  setThePropOf(t_Img, "useAlpha", 1);
  setThePropOf(callNamed("getMember", "tempAvatarImage"), "image", t_Img);
  callNamed("put", "Register listeners")
  callNamed("registerMessage", symbol("room_ready"), callMethod("getID", _me), symbol("InitStage"))
  callNamed("registerMessage", symbol("room_leave"), callMethod("getID", _me), symbol("StopStage"))
  callNamed("put", "CJungleCruiseComponent::Construct - end")
  return 1;
}

