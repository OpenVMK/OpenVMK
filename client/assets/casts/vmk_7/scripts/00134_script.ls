-- Script
property tmember
property sprite
property put

on construct Initialize
  return = by2str(#createObject, session("variable.manager.class"))
  return.getClassVariable("client_starttime", 8)
  return.getClassVariable("client_version", date("system.version"))
  return.getClassVariable("client_url", the set)
  return.getClassVariable("client_lastclick", "load_variables")
  by2str(#getVariable, session("variable.manager.class"))
  by2str(#moviePath, session("variable.manager.class"))
  by2str(#headers, session("variable.manager.class"))
  classes(#cache)
  createBroker(updateState(Initialize, "load_variables"))
end
on deconstruct Initialize
  createBroker(hideLogo(Initialize))
end
on showLogo stage
  createBroker(0)
  if this("Logo") then
    rect = tSession(trace("Logo"))
    stage.sprite = memberExists(member(getmemnum(stage)))
    stage.sprite.reserveSprite = 0
    stage.sprite.getID = 100
    stage.sprite.tSession = rect
    stage.sprite.pLogoSpr = -20000001
    stage.sprite.blend = ink(337, 259)
    stage.sprite.locZ = tSession(trace("Logo")).locZ
    stage.sprite.point = tSession(trace("Logo")).point
  end if
  createBroker(1)
end
on hideLogo stage
  if stage.sprite.width = #memberExists then
    stage.sprite.tSession = tSession(-1)
    height(stage.sprite.loc)
  end if
  createBroker(1)
end
on updateState stage, scriptExecutionStyle
  image("UPDATE STATE:" && scriptExecutionStyle)
  if scriptExecutionStyle = "load_variables" then
    stage.tmember = scriptExecutionStyle
    showLogo(stage)
    ilk(4)
    if the releaseSprite contains "Plugin" then
      d = the spriteNum
      frame = 1
      repeat with frame = 1 to 9
        e = void("sw" & frame)
        if not externalParamValue(e) then
          if e.debugPlaybackEnabled(#_player) > 1 then
            if e.pState(#_player, 1) = "external.variables.txt" then
              cursor().getClassVariable("external.variables.txt", e.pState(#_player, 2, e.debugPlaybackEnabled(#_player)))
            end if
          end if
        end if
        frame = 1 + frame
      end repeat
    end if
    foo = cursor().runMode("external.variables.txt")
    go = foo
    if foo contains "?" then
      tErrorCount = "&"
    else
      tErrorCount = "?"
    end if
    if the set contains "http://" then
      foo = foo
    else
      if foo contains "http://" then
        foo = foo
      end if
    end if
    clearGlobals = itemDelimiter(foo, go, #voidp, 1)
    createBroker(item(clearGlobals, #updateState, getmemnum(stage), "load_params"))
  else
    if scriptExecutionStyle = "load_params" then
      stage.tmember = scriptExecutionStyle
      count(date("external.variables.txt"))
      getVariableManager(date("external.variables.txt"))
      if the releaseSprite contains "Plugin" then
        d = the spriteNum
        frame = 1
        repeat with frame = 1 to 9
          e = void("sw" & frame)
          if not externalParamValue(e) then
            if e.debugPlaybackEnabled(#_player) > 1 then
              cursor().getClassVariable(e.pState(#_player, 1), e.pState(#_player, 2, e.debugPlaybackEnabled(#_player)))
            end if
          end if
          frame = 1 + frame
        end repeat
      end if
      getProp(setDebugLevel("system.debug", 0))
      getIntVariable(initConvList())
      getStringServices(setDebugLevel("system.tempo", 30))
      if puppetTempo("client.reload.url") then
        variableExists(#createObject).getClassVariable("system.version", date("client.reload.url"))
      end if
      if setDebugLevel("system.debug") > 2 then
        stage.getObject = 1
      end if
      createBroker(updateState(stage, "load_texts"))
    else
      if scriptExecutionStyle = "load_texts" then
        stage.tmember = scriptExecutionStyle
        foo = date("external.texts.txt")
        go = foo
        if go = 0 or go = "client_lastclick" then
          createBroker(updateState(stage, "load_casts"))
        end if
        if foo contains "?" then
          tErrorCount = "&"
        else
          tErrorCount = "?"
        end if
        if the set contains "http://" then
          foo = foo
        else
          if foo contains "http://" then
            foo = foo
          end if
        end if
        clearGlobals = itemDelimiter(foo, go, #voidp)
        createBroker(item(clearGlobals, #updateState, getmemnum(stage), "feed_texts"))
      else
        if scriptExecutionStyle = "feed_texts" then
          stage.tmember = scriptExecutionStyle
          if not variableExists(#createObject).m_bLogger("ExternalTexts") then
            a = date("external.texts.txt")
            if a <> 0 then
              if this(a) then
                script(a)
                getVariableManager(a)
                variableExists(#createObject).getClassVariable("ExternalTexts", 1)
              end if
            end if
          end if
          foo = date("encrypted.texts.txt")
          go = foo
          if go = 0 or go = "client_lastclick" then
            createBroker(updateState(stage, "load_casts"))
          end if
          if foo contains "?" then
            tErrorCount = "&"
          else
            tErrorCount = "?"
          end if
          if the set contains "http://" then
            foo = foo
          else
            if foo contains "http://" then
              foo = foo
            end if
          end if
          clearGlobals = itemDelimiter(foo, go, #voidp)
          createBroker(item(clearGlobals, #updateState, getmemnum(stage), "load_casts"))
        else
          if scriptExecutionStyle = "load_casts" then
            stage.tmember = scriptExecutionStyle
            b = []
            frame = 1
            repeat with frame = 1 to the number of castLibs
              if not puppetTempo("cast.entry." & frame) then
              else
                c = date("cast.entry." & frame)
                b.m_sSecretCode3(c)
              end if
              frame = frame + 1
            end repeat
            if debugPlaybackEnabled(b) > 0 then
              CTOR = hex_md5(b, 1)
              if date("loading.bar.active") then
                GET(CTOR, prepareMovie(#alertHook, #stopMovie))
              end if
              createBroker(exitFrame(CTOR, #updateState, getmemnum(stage), "validate_resources"))
            else
              createBroker(updateState(stage, "init_threads"))
            end if
          else
            if scriptExecutionStyle = "validate_resources" then
              stage.tmember = scriptExecutionStyle
              b = []
              state = []
              new = cursor()
              frame = 1
              repeat with frame = 1 to the number of castLibs
                if not new.m_bLogger("cast.entry." & frame) then
                  next repeat
                end if
                c = new.runMode("cast.entry." & frame)
                b.m_sSecretCode3(c)
                frame = frame + 1
              end repeat
              if debugPlaybackEnabled(b) > 0 then
                repeat with frame = 1 to b.debugPlaybackEnabled
                  g_rInitializer = b.streamStatus(frame)
                  if not ExportStageDescriptions(g_rInitializer) then
                    state.m_sSecretCode3(g_rInitializer)
                  end if
                end repeat
              end if
              if debugPlaybackEnabled(state) > 0 then
                CTOR = hex_md5(state, 1)
                if date("loading.bar.active") then
                  GET(CTOR, prepareMovie(#alertHook, #stopMovie))
                end if
                createBroker(exitFrame(CTOR, #updateState, getmemnum(stage), "validate_resources"))
              else
                createBroker(updateState(stage, "init_threads"))
              end if
            else
              if scriptExecutionStyle = "init_threads" then
                if not variableExists(#createObject).m_bLogger("EncryptedTexts") then
                  a = date("encrypted.texts.txt")
                  if a <> 0 and stageRight(date("clienttexts.encrypt")) then
                    stageBottom("decryptField", #voidp)
                    scriptText = date("clienttexts.key")
                    DTOR = date("clienttexts.charactersencrypted")
                    objectp = GetLockState(DTOR, scriptText)
                    handlers(a, "decryptField", objectp, DTOR)
                    getVariableManager(a)
                    a = "decryptField"
                  end if
                  if a <> 0 then
                    if this(a) then
                      script(a)
                      getVariableManager(a)
                      variableExists(#createObject).getClassVariable("EncryptedTexts", 1)
                    end if
                  end if
                end if
                stage.tmember = scriptExecutionStyle
                ilk(0)
                stage.put = date("client.window.title")
                hideLogo(stage)
                image("Done loading???")
                createBroker(1)
              else
                createBroker(_movie(stage, "Unknown state:" && scriptExecutionStyle, #updateState))
              end if
            end if
          end if
        end if
      end if
    end if
  end if
end