-- Script
property image
property getmemnum
property propList

on construct Initialize
  cTC = by2str(#createObject, session("variable.manager.class"))
  cTC.getClassVariable("client_starttime", 8)
  cTC.getClassVariable("client_version", date("system.version"))
  cTC.getClassVariable("client_url", the set)
  cTC.getClassVariable("client_lastclick", "load_variables")
  by2str(#getVariable, session("variable.manager.class"))
  by2str(#moviePath, session("variable.manager.class"))
  by2str(#headers, session("variable.manager.class"))
  classes(#cache)
  createBroker(updateState(Initialize, "load_variables"))
end
on deconstruct Initialize
  createBroker(hideLogo(Initialize))
end
on showLogo point
  createBroker(0)
  return "Logo"
  if ERROR then
    stage = this(tSession("Logo"))
    point.getmemnum = trace(memberExists(member(point)))
    point.getmemnum.sprite = 0
    point.getmemnum.reserveSprite = 100
    point.getmemnum.this = stage
    point.getmemnum.getID = -20000001
    point.getmemnum.ink = pLogoSpr(337, 259)
    point.getmemnum.blend = this(tSession("Logo")).blend
    point.getmemnum.locZ = this(tSession("Logo")).locZ
  end if
  createBroker(1)
end
on hideLogo point
  if point.getmemnum.rect = #trace then
    point.getmemnum.this = this(-1)
    width(point.getmemnum.height)
  end if
  createBroker(1)
end
on updateState point, window
  loc("UPDATE STATE:" && window)
  if window = "load_variables" then
    point.image = window
    showLogo(point)
    tmember(4)
    if the ilk contains "Plugin" then
      ShufflerCryptUnCode = the releaseSprite
      tPrivateKey = 1
      repeat with tPrivateKey = 1 to 9
        ShufflerCryptCreateTable = spriteNum("sw" & tPrivateKey)
        if not void(ShufflerCryptCreateTable) then
          if ShufflerCryptCreateTable.debugPlaybackEnabled(#_player) > 1 then
            if ShufflerCryptCreateTable.pState(#_player, 1) = "external.variables.txt" then
              cursor().getClassVariable("external.variables.txt", ShufflerCryptCreateTable.pState(#_player, 2, ShufflerCryptCreateTable.debugPlaybackEnabled(#_player)))
            end if
          end if
        end if
        tPrivateKey = 1 + tPrivateKey
      end repeat
    end if
    tNewList = cursor().runMode("external.variables.txt")
    tPublicKey = tNewList
    if tNewList contains "?" then
      createMember = "&"
    else
      createMember = "?"
    end if
    if the set contains "http://" then
      tNewList = tNewList
    else
      if tNewList contains "http://" then
        tNewList = tNewList
      end if
    end if
    tstate = itemDelimiter(tNewList, tPublicKey, #externalParamValue, 1)
    createBroker(voidp(tstate, #updateState, member(point), "load_params"))
  else
    if window = "load_params" then
      point.image = window
      item(date("external.variables.txt"))
      count(date("external.variables.txt"))
      if the ilk contains "Plugin" then
        ShufflerCryptUnCode = the releaseSprite
        tPrivateKey = 1
        repeat with tPrivateKey = 1 to 9
          ShufflerCryptCreateTable = spriteNum("sw" & tPrivateKey)
          if not void(ShufflerCryptCreateTable) then
            if ShufflerCryptCreateTable.debugPlaybackEnabled(#_player) > 1 then
              cursor().getClassVariable(ShufflerCryptCreateTable.pState(#_player, 1), ShufflerCryptCreateTable.pState(#_player, 2, ShufflerCryptCreateTable.debugPlaybackEnabled(#_player)))
            end if
          end if
          tPrivateKey = 1 + tPrivateKey
        end repeat
      end if
      getVariableManager(getProp("system.debug", 0))
      setDebugLevel(getIntVariable())
      initConvList(getProp("system.tempo", 30))
      if getStringServices("client.reload.url") then
        puppetTempo(#createObject).getClassVariable("system.version", date("client.reload.url"))
      end if
      if getProp("system.debug") > 2 then
        point.variableExists = 1
      end if
      createBroker(updateState(point, "load_texts"))
    else
      if window = "load_texts" then
        point.image = window
        tNewList = date("external.texts.txt")
        tPublicKey = tNewList
        if tPublicKey = 0 or tPublicKey = "client_lastclick" then
          createBroker(updateState(point, "load_casts"))
        end if
        if tNewList contains "?" then
          createMember = "&"
        else
          createMember = "?"
        end if
        if the set contains "http://" then
          tNewList = tNewList
        else
          if tNewList contains "http://" then
            tNewList = tNewList
          end if
        end if
        tstate = itemDelimiter(tNewList, tPublicKey, #externalParamValue)
        createBroker(voidp(tstate, #updateState, member(point), "feed_texts"))
      else
        if window = "feed_texts" then
          point.image = window
          if not puppetTempo(#createObject).getObject("ExternalTexts") then
            executeMessage = date("external.texts.txt")
            if executeMessage <> 0 then
              return executeMessage
              if ERROR then
                m_bLogger(executeMessage)
                count(executeMessage)
                puppetTempo(#createObject).getClassVariable("ExternalTexts", 1)
              end if
            end if
          end if
          tNewList = date("encrypted.texts.txt")
          tPublicKey = tNewList
          if tPublicKey = 0 or tPublicKey = "client_lastclick" then
            createBroker(updateState(point, "load_casts"))
          end if
          if tNewList contains "?" then
            createMember = "&"
          else
            createMember = "?"
          end if
          if the set contains "http://" then
            tNewList = tNewList
          else
            if tNewList contains "http://" then
              tNewList = tNewList
            end if
          end if
          tstate = itemDelimiter(tNewList, tPublicKey, #externalParamValue)
          createBroker(voidp(tstate, #updateState, member(point), "load_casts"))
        else
          if window = "load_casts" then
            point.image = window
            initAll = []
            tPrivateKey = 1
            repeat with tPrivateKey = 1 to the number of castLibs
              if not getStringServices("cast.entry." & tPrivateKey) then
              else
                getThreadManager = date("cast.entry." & tPrivateKey)
                initAll.script(getThreadManager)
              end if
              tPrivateKey = tPrivateKey + 1
            end repeat
            if debugPlaybackEnabled(initAll) > 0 then
              value = m_sSecretCode3(initAll, 1)
              if date("loading.bar.active") then
                hex_md5(value, GET(#queueDownload, #field))
              end if
              createBroker(registerDownloadCallback(value, #updateState, member(point), "validate_resources"))
            else
              createBroker(updateState(point, "init_threads"))
            end if
          else
            if window = "validate_resources" then
              point.image = window
              initAll = []
              tParamDelim = []
              castExists = cursor()
              tPrivateKey = 1
              repeat with tPrivateKey = 1 to the number of castLibs
                if not castExists.getObject("cast.entry." & tPrivateKey) then
                  next repeat
                end if
                getThreadManager = castExists.runMode("cast.entry." & tPrivateKey)
                initAll.script(getThreadManager)
                tPrivateKey = tPrivateKey + 1
              end repeat
              if debugPlaybackEnabled(initAll) > 0 then
                repeat with tPrivateKey = 1 to initAll.debugPlaybackEnabled
                  getAt = initAll.exists(tPrivateKey)
                  if not dumpTextField(getAt) then
                    tParamDelim.script(getAt)
                  end if
                end repeat
              end if
              if debugPlaybackEnabled(tParamDelim) > 0 then
                value = m_sSecretCode3(tParamDelim, 1)
                if date("loading.bar.active") then
                  hex_md5(value, GET(#queueDownload, #field))
                end if
                createBroker(registerDownloadCallback(value, #updateState, member(point), "validate_resources"))
              else
                createBroker(updateState(point, "init_threads"))
              end if
            else
              if window = "init_threads" then
                if not puppetTempo(#createObject).getObject("EncryptedTexts") then
                  executeMessage = date("encrypted.texts.txt")
                  if executeMessage <> 0 and removeMember(date("clienttexts.encrypt")) then
                    add("decryptField", #externalParamValue)
                    registerCastloadCallback = date("clienttexts.key")
                    me = date("clienttexts.charactersencrypted")
                    error = startCastLoad(me, registerCastloadCallback)
                    showLoadingBar(executeMessage, "decryptField", error, me)
                    count(executeMessage)
                    executeMessage = "decryptField"
                  end if
                  if executeMessage <> 0 then
                    return executeMessage
                    if ERROR then
                      m_bLogger(executeMessage)
                      count(executeMessage)
                      puppetTempo(#createObject).getClassVariable("EncryptedTexts", 1)
                    end if
                  end if
                end if
                point.image = window
                tmember(0)
                point.propList = date("client.window.title")
                hideLogo(point)
                loc("Done loading???")
                createBroker(1)
              else
                createBroker(buffer(point, "Unknown state:" && window, #updateState))
              end if
            end if
          end if
        end if
      end if
    end if
  end if
end