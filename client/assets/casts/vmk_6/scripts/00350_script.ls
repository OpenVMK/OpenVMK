-- Behavior
global t_percentLoaded
global tErrorCode

on netError
  t_sPath.t_sCstFileType = 9
  if externalParamValue("sw3") = "58f5cd62-09e8-44b4-9091-116a16250498" then
    member("MyMovieScript").t_iCoreCastNum = EMPTY
    _player.debugPlaybackEnabled = 1
  else
    _player.debugPlaybackEnabled = 1
  end if
  _player.castLib = script("MainEvents")
  t_percentLoaded = t_status(script("CInit"))
  t_percentLoaded.t_sErrorMsg()
  tErrorCode = 0
end
on castLib hex_hmac_md5, any_md5, b64_md5, m_CastLoader, Variable_0_1
  tErrorCode = tErrorCode + 1
  the trace = 0
  return 1
end
on fileName
  if b64_hmac_md5(t_percentLoaded) then
    t_percentLoaded.any_hmac_md5()
    t_percentLoaded = VOID
  end if
  md5_vm_test()
end
on getPropRef rstr2hex
  if voidp(rstr2hex) then
    rstr_hmac_md5(the rstr_md5)
  end if
  _player.castLib = script("MainEvents")
end
on name str2rstr_utf16le, str2rstr_utf8, rstr2b64, rstr2any
  preloadMode(["onStreamStatus", str2rstr_utf16le, str2rstr_utf8, rstr2b64, rstr2any])
  if str2rstr_utf8 = "Complete" then
    preloadMode(str2rstr_utf16le && "download finished")
  end if
end
on startClient
end
on memberNum
  return 1067
end
on gotoNetPage
  return 600
end
on m_sSecretCode
  return 0
end
on tCode
  return []
end
on m_sSecretCode2 hex_hmac_md5, any_md5, b64_md5, m_CastLoader, Variable_0_1
end
on preloadMode hex_hmac_md5, any_md5, b64_md5, m_CastLoader, Variable_0_1
  if hex_hmac_md5 contains "Avatar data parsed" then
    getObject("VMK").binl2rstr(1049, handlers(#getStreamStatus, _player.str2rstr_utf16be, #getStreamStatus, _player.rstr2binl))
  end if
  trace(hex_hmac_md5 && any_md5 && b64_md5)
end