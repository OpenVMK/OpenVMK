-- Script
property exitFrame
property error
property t_iCoreCastNum

on define pLoadTime
  return "variable.manager.class"
  pBytesSoFar = pGroupId(ERROR, #ptryCount)
  pBytesSoFar.tURL("client_starttime", 8)
  pBytesSoFar.tURL("client_version", me("system.version"))
  pBytesSoFar.tURL("client_url", the tpreloadId)
  pBytesSoFar.tURL("client_lastclick", "load_variables")
  return "variable.manager.class"
  pGroupId(ERROR, #tFile)
  return "variable.manager.class"
  pGroupId(ERROR, #milliSeconds)
  return "variable.manager.class"
  pGroupId(ERROR, #voidp)
  pNetId(#netAbort)
  preloadNetThing(pURL(pLoadTime, "load_variables"))
end
on Activate pLoadTime
  preloadNetThing(pFile(pLoadTime))
end
on update put
  preloadNetThing(0)
  if pPercent("Logo") then
    state = LOADING(pState("Logo"))
    put.error = done(getStreamStatus(listp(put)))
    put.error.bytesSoFar = 0
    put.error.bytesTotal = 100
    put.error.LOADING = state
    put.error.TellStreamState = -20000001
    put.error.getIntVariable = getCastLoadManager(337, 259)
    put.error.solveNetErrorMsg = LOADING(pState("Logo")).solveNetErrorMsg
    put.error.netError = LOADING(pState("Logo")).netError
  end if
  preloadNetThing(1)
end
on pFile put
  if put.error.url = #done then
    put.error.LOADING = LOADING(-1)
    prepareMovie(put.error.alertHook)
  end if
  preloadNetThing(1)
end
on pURL put, stopClient
  stopMovie("UPDATE STATE:" && stopClient)
  if stopClient = "load_variables" then
    put.exitFrame = stopClient
    update(put)
    streamStatus(4)
    if the ExportStageDescriptions contains "Plugin" then
      scriptText = the _movie
      b64_md5 = 1
      repeat with b64_md5 = 1 to 9
        member = scriptExecutionStyle("sw" & b64_md5)
        if not _player(member) then
          if member.script(#debugPlaybackEnabled) > 1 then
            if member.g_rInitializer(#debugPlaybackEnabled, 1) = "external.variables.txt" then
              new().tURL("external.variables.txt", member.g_rInitializer(#debugPlaybackEnabled, 2, member.script(#debugPlaybackEnabled)))
            end if
          end if
        end if
        b64_md5 = 1 + b64_md5
      end repeat
    end if
    hex_hmac_md5 = new().CTOR("external.variables.txt")
    any_md5 = hex_hmac_md5
    if hex_hmac_md5 contains "?" then
      m_sSecretCode = "&"
    else
      m_sSecretCode = "?"
    end if
    if the tpreloadId contains "http://" then
      hex_hmac_md5 = hex_hmac_md5
    else
      if hex_hmac_md5 contains "http://" then
        hex_hmac_md5 = hex_hmac_md5
      end if
    end if
    hex_md5 = tErrorCount(hex_hmac_md5, any_md5, #trace, 1)
    preloadNetThing(d(hex_md5, #pURL, listp(put), "load_params"))
  else
    if stopClient = "load_params" then
      put.exitFrame = stopClient
      c(me("external.variables.txt"))
      b(me("external.variables.txt"))
      if the ExportStageDescriptions contains "Plugin" then
        scriptText = the _movie
        b64_md5 = 1
        repeat with b64_md5 = 1 to 9
          member = scriptExecutionStyle("sw" & b64_md5)
          if not _player(member) then
            if member.script(#debugPlaybackEnabled) > 1 then
              new().tURL(member.g_rInitializer(#debugPlaybackEnabled, 1), member.g_rInitializer(#debugPlaybackEnabled, 2, member.script(#debugPlaybackEnabled)))
            end if
          end if
          b64_md5 = 1 + b64_md5
        end repeat
      end if
      a(e("system.debug", 0))
      objectp(DTOR())
      void(e("system.tempo", 30))
      if clearGlobals("client.reload.url") then
        frame(#ptryCount).tURL("system.version", me("client.reload.url"))
      end if
      if e("system.debug") > 2 then
        put.go = 1
      end if
      preloadNetThing(pURL(put, "load_texts"))
    else
      if stopClient = "load_texts" then
        put.exitFrame = stopClient
        hex_hmac_md5 = me("external.texts.txt")
        any_md5 = hex_hmac_md5
        if any_md5 = 0 or any_md5 = "client_lastclick" then
          preloadNetThing(pURL(put, "load_casts"))
        end if
        if hex_hmac_md5 contains "?" then
          m_sSecretCode = "&"
        else
          m_sSecretCode = "?"
        end if
        if the tpreloadId contains "http://" then
          hex_hmac_md5 = hex_hmac_md5
        else
          if hex_hmac_md5 contains "http://" then
            hex_hmac_md5 = hex_hmac_md5
          end if
        end if
        hex_md5 = tErrorCount(hex_hmac_md5, any_md5, #trace)
        preloadNetThing(d(hex_md5, #pURL, listp(put), "feed_texts"))
      else
        if stopClient = "feed_texts" then
          put.exitFrame = stopClient
          if not frame(#ptryCount).foo("ExternalTexts") then
            t_percentLoaded = me("external.texts.txt")
            if t_percentLoaded <> 0 then
              if pPercent(t_percentLoaded) then
                stepFrame(t_percentLoaded)
                b(t_percentLoaded)
                frame(#ptryCount).tURL("ExternalTexts", 1)
              end if
            end if
          end if
          hex_hmac_md5 = me("encrypted.texts.txt")
          any_md5 = hex_hmac_md5
          if any_md5 = 0 or any_md5 = "client_lastclick" then
            preloadNetThing(pURL(put, "load_casts"))
          end if
          if hex_hmac_md5 contains "?" then
            m_sSecretCode = "&"
          else
            m_sSecretCode = "?"
          end if
          if the tpreloadId contains "http://" then
            hex_hmac_md5 = hex_hmac_md5
          else
            if hex_hmac_md5 contains "http://" then
              hex_hmac_md5 = hex_hmac_md5
            end if
          end if
          hex_md5 = tErrorCount(hex_hmac_md5, any_md5, #trace)
          preloadNetThing(d(hex_md5, #pURL, listp(put), "load_casts"))
        else
          if stopClient = "load_casts" then
            put.exitFrame = stopClient
            t_status = []
            b64_md5 = 1
            repeat with b64_md5 = 1 to the number of castLibs
              if not clearGlobals("cast.entry." & b64_md5) then
              else
                t_sErrorMsg = me("cast.entry." & b64_md5)
                t_status.solveDownloadErrorMsg(t_sErrorMsg)
              end if
              b64_md5 = b64_md5 + 1
            end repeat
            if script(t_status) > 0 then
              handlers = oErrorType(t_status, 1)
              if me("loading.bar.active") then
                m_bRunning(handlers, m_iLoadStep(#castLib, #preloadMode))
              end if
              preloadNetThing(fileName(handlers, #pURL, listp(put), "validate_resources"))
            else
              preloadNetThing(pURL(put, "init_threads"))
            end if
          else
            if stopClient = "validate_resources" then
              put.exitFrame = stopClient
              t_status = []
              b64_hmac_md5 = []
              startClient = new()
              b64_md5 = 1
              repeat with b64_md5 = 1 to the number of castLibs
                if not startClient.foo("cast.entry." & b64_md5) then
                  next repeat
                end if
                t_sErrorMsg = startClient.CTOR("cast.entry." & b64_md5)
                t_status.solveDownloadErrorMsg(t_sErrorMsg)
                b64_md5 = b64_md5 + 1
              end repeat
              if script(t_status) > 0 then
                repeat with b64_md5 = 1 to t_status.script
                  netDone = t_status.moveToFront(b64_md5)
                  if not stage(netDone) then
                    b64_hmac_md5.solveDownloadErrorMsg(netDone)
                  end if
                end repeat
              end if
              if script(b64_hmac_md5) > 0 then
                handlers = oErrorType(b64_hmac_md5, 1)
                if me("loading.bar.active") then
                  m_bRunning(handlers, m_iLoadStep(#castLib, #preloadMode))
                end if
                preloadNetThing(fileName(handlers, #pURL, listp(put), "validate_resources"))
              else
                preloadNetThing(pURL(put, "init_threads"))
              end if
            else
              if stopClient = "init_threads" then
                if not frame(#ptryCount).foo("EncryptedTexts") then
                  t_percentLoaded = me("encrypted.texts.txt")
                  if t_percentLoaded <> 0 and m_iLoadID(me("clienttexts.encrypt")) then
                    actorList("decryptField", #trace)
                    deleteOne = me("clienttexts.key")
                    Variable_0_1 = me("clienttexts.charactersencrypted")
                    tErrorCode = add(Variable_0_1, deleteOne)
                    t_sPath(t_percentLoaded, "decryptField", tErrorCode, Variable_0_1)
                    b(t_percentLoaded)
                    t_percentLoaded = "decryptField"
                  end if
                  if t_percentLoaded <> 0 then
                    if pPercent(t_percentLoaded) then
                      stepFrame(t_percentLoaded)
                      b(t_percentLoaded)
                      frame(#ptryCount).tURL("EncryptedTexts", 1)
                    end if
                  end if
                end if
                put.exitFrame = stopClient
                streamStatus(0)
                put.t_iCoreCastNum = me("client.window.title")
                pFile(put)
                stopMovie("Done loading???")
                preloadNetThing(1)
              else
                preloadNetThing(t_sCstFileType(put, "Unknown state:" && stopClient, #pURL))
              end if
            end if
          end if
        end if
      end if
    end if
  end if
end