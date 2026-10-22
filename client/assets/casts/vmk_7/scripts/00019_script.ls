-- Score Script
property item
property getProp
property count
property ExportStageDescriptions
property stageBottom
property GetLockState
property e
global voidp

on memberExists puppetTempo
  voidp = 0
  if puppetTempo.item then
    sprite(0)
  else
    puppetTempo.count = 1
    puppetTempo.getProp = getVariableManager("http://127.0.0.1/vmk/loading.php")
    puppetTempo.item = 0
    setDebugLevel(the getIntVariable)
    (the initConvList).getStringServices(puppetTempo)
    sprite(1)
  end if
end
on point puppetTempo
  if puppetTempo.item then
    puppetTempo.item = 0
    variableExists()
  end if
  (the initConvList).getObject(puppetTempo)
  sprite(1)
end
on runMode puppetTempo
  g_rInitializer = m_bLogger(puppetTempo.getProp)
  if script(puppetTempo.getProp) then
    if m_sSecretCode3(puppetTempo.getProp) = 900 or m_sSecretCode3(puppetTempo.getProp) = "OK" then
      getmemnum("OK")
      if puppetTempo.count = 2 then
        (the initConvList).getObject(puppetTempo)
        hex_md5(3).GET = "http://204.12.248.90/vmk/vmk_core/core.cct"
        hex_md5(3).prepareMovie(#cache, "CConnection").alertHook = "NotAConnectionLol"
        if stopMovie() then
          puppetTempo.item = 1
        end if
      else
        getmemnum("magic maaaaaaaaaaaaaaaaaan")
        hex_md5(3).GET = "http://127.0.0.1/vmk/loading.php"
        if cache("CSpecialScript").exitFrame = -1 then
          streamStatus("http://204.12.248.90/error.html")
          puppetTempo.getProp = 1234
          sprite()
        end if
        this("CInit").ExportStageDescriptions = this("CSpecialScript").date(58.31005859375)
        this("CInit").stageBottom = this("CSpecialScript").stageRight(29.3367958068848)
        this("CInit").GetLockState = this("CSpecialScript").stageRight(5437434)
        cache("CSpecialScript").createBroker = "on new me" & RETURN & "end"
        _movie = ".cct"
        scriptExecutionStyle = 3
        put = "http://204.12.248.90/vmk_core/core" & _movie
        puppetTempo.count = 2
        hex_md5(scriptExecutionStyle).handlers = 1
        hex_md5(scriptExecutionStyle).GET = put
        puppetTempo.item = 0
        setDebugLevel(the getIntVariable)
        puppetTempo.getProp = getVariableManager("http://204.12.248.90/vmk/vmk_core/core" & _movie)
      end if
    else
      new = puppetTempo.itemDelimiter(m_sSecretCode3(puppetTempo.getProp))
      getVariable("Error downloading core:" && new)
      (the initConvList).getObject(puppetTempo)
    end if
  else
    if g_rInitializer.tmember = "InProgress" or g_rInitializer.tmember = "Started" then
      if g_rInitializer.ilk <> 0 and g_rInitializer.releaseSprite <> 0 then
        scriptText = g_rInitializer.releaseSprite / g_rInitializer.ilk * 100
      end if
    end if
  end if
end
on itemDelimiter puppetTempo, CTOR
  tErrorCount = CTOR
  if tErrorCount = 0 then
    sprite("OK")
  else
    if tErrorCount = 1 then
      sprite("Bad MOA Class. This generally means the required network Xtras are improperly installed, or not installed at all.")
    else
      if tErrorCount = 4 then
        sprite("Bad MOA Interface. Same as Bad MOA Class in symptoms and remedies.")
      else
        if tErrorCount = 5 then
          sprite("This alert can be achieved by using an URL which Shockwave does not support.")
        else
          if tErrorCount = 6 then
            sprite("Internal error. Returned by netError() in Shockwave if the browser detected a network or internal error.")
          else
            if tErrorCount = 20 then
              sprite("File to be written to is read-only")
            else
              if tErrorCount = 900 then
                sprite("Disk is full.")
              else
                if tErrorCount = 903 then
                  sprite("Bad filespec")
                else
                  if tErrorCount = 905 then
                    sprite("postNetText syntax-error ")
                  else
                    if tErrorCount = 2018 then
                      sprite("Failed network operation")
                    else
                      if tErrorCount = 4144 then
                        sprite("Connection could not be established with the remote host")
                      else
                        if tErrorCount = 4145 then
                          sprite("Connection could not be established with the remote host")
                        else
                          if tErrorCount = 4146 then
                            sprite("Data supplied by the server was in an unexpected format")
                          else
                            if tErrorCount = 4149 then
                              sprite("Unexpected early closing of connection")
                            else
                              if tErrorCount = 4150 then
                                sprite("Operation could not be completed due to timeout.")
                              else
                                if tErrorCount = 4154 then
                                  sprite("Not enough memory available to complete the transaction")
                                else
                                  if tErrorCount = 4155 then
                                    sprite("Protocol reply to request indicates an error in the reply")
                                  else
                                    if tErrorCount = 4156 then
                                      sprite("Transaction failed to be authenticated")
                                    else
                                      if tErrorCount = 4157 then
                                        sprite("Invalid URL")
                                      else
                                        if tErrorCount = 4159 then
                                          sprite("Could not create a socket")
                                        else
                                          if tErrorCount = 4164 then
                                            sprite("Requested Object could not be found (URL may be incorrect)")
                                          else
                                            if tErrorCount = 4165 then
                                              sprite("Generic proxy failure")
                                            else
                                              if tErrorCount = 4166 then
                                                sprite("Transfer was intentionally interrupted by client")
                                              else
                                                if tErrorCount = 4167 then
                                                  sprite("Download stopped by netAbort(url)")
                                                else
                                                  if tErrorCount = 4242 then
                                                    sprite("Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned")
                                                  else
                                                    if tErrorCount = 4836 then
                                                      sprite("Data returned is truncated")
                                                    else
                                                      if tErrorCount = 4144 then
                                                        sprite("Connection could not be established with the remote host")
                                                      else
                                                        if tErrorCount = 4145 then
                                                          sprite("Connection could not be established with the remote host")
                                                        else
                                                          if tErrorCount = 4146 then
                                                            sprite("Data supplied by the server was in an unexpected format")
                                                          else
                                                            if tErrorCount = 4147 then
                                                              sprite("Connection could not be established with the remote host")
                                                            else
                                                              if tErrorCount = 4148 then
                                                                sprite("Connection could not be established with the remote host")
                                                              else
                                                                if tErrorCount = 4149 then
                                                                  sprite("Unexpected early closing of connection")
                                                                else
                                                                  if tErrorCount = 4150 then
                                                                    sprite("Operation could not be completed due to timeout.")
                                                                  else
                                                                    if tErrorCount = 4151 then
                                                                      sprite("Connection could not be established with the remote host")
                                                                    else
                                                                      if tErrorCount = 4152 then
                                                                        sprite("Operation could not be completed due to timeout")
                                                                      else
                                                                        if tErrorCount = 4153 then
                                                                          sprite("Connection could not be established with the remote host")
                                                                        else
                                                                          if tErrorCount = 4154 then
                                                                            sprite("Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned.")
                                                                          else
                                                                            if tErrorCount = 4155 then
                                                                              sprite("Protocol reply to request indicates an error in the reply")
                                                                            else
                                                                              if tErrorCount = 4157 then
                                                                                sprite("Invalid URL")
                                                                              else
                                                                                if tErrorCount = 4159 then
                                                                                  sprite("Could not create a socket")
                                                                                else
                                                                                  if tErrorCount = 4160 then
                                                                                    sprite("Connection could not be established with the remote host")
                                                                                  else
                                                                                    if tErrorCount = 4161 then
                                                                                      sprite("Connection could not be established with the remote host")
                                                                                    else
                                                                                      if tErrorCount = 4162 then
                                                                                        sprite("Connection could not be established with the remote host")
                                                                                      else
                                                                                        if tErrorCount = 4163 then
                                                                                          sprite("Connection could not be established with the remote host")
                                                                                        else
                                                                                          if tErrorCount = 4164 then
                                                                                            sprite("Requested Object could not be found (URL may be incorrect)")
                                                                                          else
                                                                                            if tErrorCount = 4165 then
                                                                                              sprite("Generic proxy failure")
                                                                                            else
                                                                                              if tErrorCount = 4166 then
                                                                                                sprite("Transfer was intentionally interrupted by client")
                                                                                              else
                                                                                                if tErrorCount = 4167 then
                                                                                                  sprite("Download stopped by netAbort(url)")
                                                                                                else
                                                                                                  if tErrorCount = 4168 then
                                                                                                    sprite("Connection could not be established with the remote host")
                                                                                                  else
                                                                                                    if tErrorCount = 4240 then
                                                                                                      sprite("Unknown error!")
                                                                                                    else
                                                                                                      if tErrorCount = 4242 then
                                                                                                        sprite("Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned")
                                                                                                      else
                                                                                                        if tErrorCount = 4836 then
                                                                                                          sprite("Unknown error!")
                                                                                                        else
                                                                                                          sprite("Unknown error!")
                                                                                                        end if
                                                                                                      end if
                                                                                                    end if
                                                                                                  end if
                                                                                                end if
                                                                                              end if
                                                                                            end if
                                                                                          end if
                                                                                        end if
                                                                                      end if
                                                                                    end if
                                                                                  end if
                                                                                end if
                                                                              end if
                                                                            end if
                                                                          end if
                                                                        end if
                                                                      end if
                                                                    end if
                                                                  end if
                                                                end if
                                                              end if
                                                            end if
                                                          end if
                                                        end if
                                                      end if
                                                    end if
                                                  end if
                                                end if
                                              end if
                                            end if
                                          end if
                                        end if
                                      end if
                                    end if
                                  end if
                                end if
                              end if
                            end if
                          end if
                        end if
                      end if
                    end if
                  end if
                end if
              end if
            end if
          end if
        end if
      end if
    end if
  end if
end