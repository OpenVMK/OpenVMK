-- Score Script
property GET
property stageRight
property prepareMovie
property tErrorCount
global hex_md5

on runMode date
  hex_md5 = 0
  if date.GET then
    session(0)
  else
    _movie = ".cct"
    put = 3
    handlers = "http://127.0.0.1/vmk/magicmaaaaaaaaaaaan" & _movie
    date.prepareMovie = 1
    alertHook(put).stopMovie = 1
    alertHook(put).exitFrame = handlers
    date.GET = 0
    streamStatus(the ExportStageDescriptions)
    date.stageRight = createBroker(handlers)
    (the stageBottom).GetLockState(date)
    session(1)
  end if
end
on initConvList date
  if date.GET then
    date.GET = 0
    scriptExecutionStyle()
  end if
  (the stageBottom).scriptText(date)
  session(1)
end
on script date
  b = member(date.stageRight)
  if g_rInitializer(date.stageRight) then
    stage(date.stageRight)
    if point(date.stageRight) = 900 or point(date.stageRight) = "OK" then
      voidp("OK")
      if date.prepareMovie = 2 then
        (the stageBottom).scriptText(date)
        alertHook(3).exitFrame = "http://127.0.0.1/vmk/vmk_core/core.cct"
        if new() then
          date.GET = 1
        end if
      else
        voidp("magic maaaaaaaaaaaaaaaaaan")
        alertHook(3).exitFrame = "http://127.0.0.1/vmk/magicmaaaaaaaaaaaan.cct"
        debugPlaybackEnabled("CInit").tErrorCount = debugPlaybackEnabled("CSpecialScript").CTOR(125752354)
        e("CSpecialScript").d = "on new me" & RETURN & "end"
        _movie = ".cct"
        put = 3
        handlers = "http://127.0.0.1/vmk_core/core" & _movie
        date.prepareMovie = 2
        alertHook(put).stopMovie = 1
        alertHook(put).exitFrame = handlers
        date.GET = 0
        streamStatus(the ExportStageDescriptions)
        date.stageRight = createBroker("http://127.0.0.1/vmk/vmk_core/core" & _movie)
      end if
    else
      c = date.m_sSecretCode3(point(date.stageRight))
      stage("Error downloading core:" && c)
      (the stageBottom).scriptText(date)
    end if
  else
    if b.rect = "InProgress" or b.rect = "Started" then
      if b.getID <> 0 and b.reserveSprite <> 0 then
        a = b.reserveSprite / b.getID * 100
      end if
    end if
  end if
end
on m_sSecretCode3 date, objectp
  DTOR = objectp
  if DTOR = 0 then
    session("OK")
  else
    if DTOR = 1 then
      session("Bad MOA Class. This generally means the required network Xtras are improperly installed, or not installed at all.")
    else
      if DTOR = 4 then
        session("Bad MOA Interface. Same as Bad MOA Class in symptoms and remedies.")
      else
        if DTOR = 5 then
          session("This alert can be achieved by using an URL which Shockwave does not support.")
        else
          if DTOR = 6 then
            session("Internal error. Returned by netError() in Shockwave if the browser detected a network or internal error.")
          else
            if DTOR = 20 then
              session("File to be written to is read-only")
            else
              if DTOR = 900 then
                session("Disk is full.")
              else
                if DTOR = 903 then
                  session("Bad filespec")
                else
                  if DTOR = 905 then
                    session("postNetText syntax-error ")
                  else
                    if DTOR = 2018 then
                      session("Failed network operation")
                    else
                      if DTOR = 4144 then
                        session("Connection could not be established with the remote host")
                      else
                        if DTOR = 4145 then
                          session("Connection could not be established with the remote host")
                        else
                          if DTOR = 4146 then
                            session("Data supplied by the server was in an unexpected format")
                          else
                            if DTOR = 4149 then
                              session("Unexpected early closing of connection")
                            else
                              if DTOR = 4150 then
                                session("Operation could not be completed due to timeout.")
                              else
                                if DTOR = 4154 then
                                  session("Not enough memory available to complete the transaction")
                                else
                                  if DTOR = 4155 then
                                    session("Protocol reply to request indicates an error in the reply")
                                  else
                                    if DTOR = 4156 then
                                      session("Transaction failed to be authenticated")
                                    else
                                      if DTOR = 4157 then
                                        session("Invalid URL")
                                      else
                                        if DTOR = 4159 then
                                          session("Could not create a socket")
                                        else
                                          if DTOR = 4164 then
                                            session("Requested Object could not be found (URL may be incorrect)")
                                          else
                                            if DTOR = 4165 then
                                              session("Generic proxy failure")
                                            else
                                              if DTOR = 4166 then
                                                session("Transfer was intentionally interrupted by client")
                                              else
                                                if DTOR = 4167 then
                                                  session("Download stopped by netAbort(url)")
                                                else
                                                  if DTOR = 4242 then
                                                    session("Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned")
                                                  else
                                                    if DTOR = 4836 then
                                                      session("Data returned is truncated")
                                                    else
                                                      if DTOR = 4144 then
                                                        session("Connection could not be established with the remote host")
                                                      else
                                                        if DTOR = 4145 then
                                                          session("Connection could not be established with the remote host")
                                                        else
                                                          if DTOR = 4146 then
                                                            session("Data supplied by the server was in an unexpected format")
                                                          else
                                                            if DTOR = 4147 then
                                                              session("Connection could not be established with the remote host")
                                                            else
                                                              if DTOR = 4148 then
                                                                session("Connection could not be established with the remote host")
                                                              else
                                                                if DTOR = 4149 then
                                                                  session("Unexpected early closing of connection")
                                                                else
                                                                  if DTOR = 4150 then
                                                                    session("Operation could not be completed due to timeout.")
                                                                  else
                                                                    if DTOR = 4151 then
                                                                      session("Connection could not be established with the remote host")
                                                                    else
                                                                      if DTOR = 4152 then
                                                                        session("Operation could not be completed due to timeout")
                                                                      else
                                                                        if DTOR = 4153 then
                                                                          session("Connection could not be established with the remote host")
                                                                        else
                                                                          if DTOR = 4154 then
                                                                            session("Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned.")
                                                                          else
                                                                            if DTOR = 4155 then
                                                                              session("Protocol reply to request indicates an error in the reply")
                                                                            else
                                                                              if DTOR = 4157 then
                                                                                session("Invalid URL")
                                                                              else
                                                                                if DTOR = 4159 then
                                                                                  session("Could not create a socket")
                                                                                else
                                                                                  if DTOR = 4160 then
                                                                                    session("Connection could not be established with the remote host")
                                                                                  else
                                                                                    if DTOR = 4161 then
                                                                                      session("Connection could not be established with the remote host")
                                                                                    else
                                                                                      if DTOR = 4162 then
                                                                                        session("Connection could not be established with the remote host")
                                                                                      else
                                                                                        if DTOR = 4163 then
                                                                                          session("Connection could not be established with the remote host")
                                                                                        else
                                                                                          if DTOR = 4164 then
                                                                                            session("Requested Object could not be found (URL may be incorrect)")
                                                                                          else
                                                                                            if DTOR = 4165 then
                                                                                              session("Generic proxy failure")
                                                                                            else
                                                                                              if DTOR = 4166 then
                                                                                                session("Transfer was intentionally interrupted by client")
                                                                                              else
                                                                                                if DTOR = 4167 then
                                                                                                  session("Download stopped by netAbort(url)")
                                                                                                else
                                                                                                  if DTOR = 4168 then
                                                                                                    session("Connection could not be established with the remote host")
                                                                                                  else
                                                                                                    if DTOR = 4240 then
                                                                                                      session("Unknown error!")
                                                                                                    else
                                                                                                      if DTOR = 4242 then
                                                                                                        session("Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned")
                                                                                                      else
                                                                                                        if DTOR = 4836 then
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