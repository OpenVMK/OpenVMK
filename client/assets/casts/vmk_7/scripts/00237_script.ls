-- Behavior
property ExportStageDescriptions
property scriptExecutionStyle
property stageRight
property a
global streamStatus

on getProp date
  streamStatus = 0
  if date.ExportStageDescriptions then
    session(0)
  else
    tErrorCount = ".cct"
    CTOR = 3
    new = "http://127.0.0.1/vmk/magicmaaaaaaaaaaaan" & tErrorCount
    date.stageRight = 1
    stageBottom(CTOR).GetLockState = 1
    stageBottom(CTOR).handlers = new
    date.ExportStageDescriptions = 0
    put the _movie
    date.scriptExecutionStyle = createBroker(new)
    (the scriptText).g_rInitializer(date)
    session(1)
  end if
end
on script date
  if date.ExportStageDescriptions then
    date.ExportStageDescriptions = 0
    e()
  end if
  (the scriptText).d(date)
  session(1)
end
on stopMovie date
  frame = member(date.scriptExecutionStyle)
  if height(date.scriptExecutionStyle) then
    stage(date.scriptExecutionStyle)
    if point(date.scriptExecutionStyle) = 900 or point(date.scriptExecutionStyle) = "OK" then
      getIntVariable("OK")
      if date.stageRight = 2 then
        (the scriptText).d(date)
        stageBottom(3).handlers = "http://127.0.0.1/vmk/vmk_core/core.cct"
        stageBottom(3).ptryCount(#objectp, "CCastLoadInstance").loadBar = "RSA Class"
        stageBottom(3).ptryCount(#objectp, "CCastLoadInstance").DTOR = "on SorryMarioThePrincessIsInAnotherCastle me" & RETURN & "trace " & QUOTE & ":P" & QUOTE & RETURN & "end"
        if c() then
          date.ExportStageDescriptions = 1
        end if
      else
        getIntVariable("magic maaaaaaaaaaaaaaaaaan")
        stageBottom(3).handlers = "http://127.0.0.1/vmk/magicmaaaaaaaaaaaan.cct"
        item("CInit").a = item("CSpecialScript").b(125752354)
        objectp("CSpecialScript").DTOR = "on new me" & RETURN & "end"
        tErrorCount = ".cct"
        CTOR = 3
        new = "http://127.0.0.1/vmk_core/core" & tErrorCount
        date.stageRight = 2
        stageBottom(CTOR).GetLockState = 1
        stageBottom(CTOR).handlers = new
        date.ExportStageDescriptions = 0
        put the _movie
        date.scriptExecutionStyle = createBroker("http://127.0.0.1/vmk/vmk_core/core" & tErrorCount)
      end if
    else
      clearGlobals = date.exitFrame(point(date.scriptExecutionStyle))
      stage("Error downloading core:" && clearGlobals)
      (the scriptText).d(date)
    end if
  else
    if frame.rect = "InProgress" or frame.rect = "Started" then
      if frame.getID <> 0 and frame.reserveSprite <> 0 then
        go = frame.reserveSprite / frame.getID * 100
      end if
    end if
  end if
end
on exitFrame date, foo
  state = foo
  if state = 0 then
    session("OK")
  else
    if state = 1 then
      session("Bad MOA Class. This generally means the required network Xtras are improperly installed, or not installed at all.")
    else
      if state = 4 then
        session("Bad MOA Interface. Same as Bad MOA Class in symptoms and remedies.")
      else
        if state = 5 then
          session("This alert can be achieved by using an URL which Shockwave does not support.")
        else
          if state = 6 then
            session("Internal error. Returned by netError() in Shockwave if the browser detected a network or internal error.")
          else
            if state = 20 then
              session("File to be written to is read-only")
            else
              if state = 900 then
                session("Disk is full.")
              else
                if state = 903 then
                  session("Bad filespec")
                else
                  if state = 905 then
                    session("postNetText syntax-error ")
                  else
                    if state = 2018 then
                      session("Failed network operation")
                    else
                      if state = 4144 then
                        session("Connection could not be established with the remote host")
                      else
                        if state = 4145 then
                          session("Connection could not be established with the remote host")
                        else
                          if state = 4146 then
                            session("Data supplied by the server was in an unexpected format")
                          else
                            if state = 4149 then
                              session("Unexpected early closing of connection")
                            else
                              if state = 4150 then
                                session("Operation could not be completed due to timeout.")
                              else
                                if state = 4154 then
                                  session("Not enough memory available to complete the transaction")
                                else
                                  if state = 4155 then
                                    session("Protocol reply to request indicates an error in the reply")
                                  else
                                    if state = 4156 then
                                      session("Transaction failed to be authenticated")
                                    else
                                      if state = 4157 then
                                        session("Invalid URL")
                                      else
                                        if state = 4159 then
                                          session("Could not create a socket")
                                        else
                                          if state = 4164 then
                                            session("Requested Object could not be found (URL may be incorrect)")
                                          else
                                            if state = 4165 then
                                              session("Generic proxy failure")
                                            else
                                              if state = 4166 then
                                                session("Transfer was intentionally interrupted by client")
                                              else
                                                if state = 4167 then
                                                  session("Download stopped by netAbort(url)")
                                                else
                                                  if state = 4242 then
                                                    session("Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned")
                                                  else
                                                    if state = 4836 then
                                                      session("Data returned is truncated")
                                                    else
                                                      if state = 4144 then
                                                        session("Connection could not be established with the remote host")
                                                      else
                                                        if state = 4145 then
                                                          session("Connection could not be established with the remote host")
                                                        else
                                                          if state = 4146 then
                                                            session("Data supplied by the server was in an unexpected format")
                                                          else
                                                            if state = 4147 then
                                                              session("Connection could not be established with the remote host")
                                                            else
                                                              if state = 4148 then
                                                                session("Connection could not be established with the remote host")
                                                              else
                                                                if state = 4149 then
                                                                  session("Unexpected early closing of connection")
                                                                else
                                                                  if state = 4150 then
                                                                    session("Operation could not be completed due to timeout.")
                                                                  else
                                                                    if state = 4151 then
                                                                      session("Connection could not be established with the remote host")
                                                                    else
                                                                      if state = 4152 then
                                                                        session("Operation could not be completed due to timeout")
                                                                      else
                                                                        if state = 4153 then
                                                                          session("Connection could not be established with the remote host")
                                                                        else
                                                                          if state = 4154 then
                                                                            session("Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned.")
                                                                          else
                                                                            if state = 4155 then
                                                                              session("Protocol reply to request indicates an error in the reply")
                                                                            else
                                                                              if state = 4157 then
                                                                                session("Invalid URL")
                                                                              else
                                                                                if state = 4159 then
                                                                                  session("Could not create a socket")
                                                                                else
                                                                                  if state = 4160 then
                                                                                    session("Connection could not be established with the remote host")
                                                                                  else
                                                                                    if state = 4161 then
                                                                                      session("Connection could not be established with the remote host")
                                                                                    else
                                                                                      if state = 4162 then
                                                                                        session("Connection could not be established with the remote host")
                                                                                      else
                                                                                        if state = 4163 then
                                                                                          session("Connection could not be established with the remote host")
                                                                                        else
                                                                                          if state = 4164 then
                                                                                            session("Requested Object could not be found (URL may be incorrect)")
                                                                                          else
                                                                                            if state = 4165 then
                                                                                              session("Generic proxy failure")
                                                                                            else
                                                                                              if state = 4166 then
                                                                                                session("Transfer was intentionally interrupted by client")
                                                                                              else
                                                                                                if state = 4167 then
                                                                                                  session("Download stopped by netAbort(url)")
                                                                                                else
                                                                                                  if state = 4168 then
                                                                                                    session("Connection could not be established with the remote host")
                                                                                                  else
                                                                                                    if state = 4240 then
                                                                                                      session("Unknown error!")
                                                                                                    else
                                                                                                      if state = 4242 then
                                                                                                        session("Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned")
                                                                                                      else
                                                                                                        if state = 4836 then
                                                                                                          session("Unknown error!")
                                                                                                        else
                                                                                                          session("Unknown error!")
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