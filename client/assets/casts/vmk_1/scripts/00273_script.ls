-- Score Script
property _movie
property tErrorCount
property scriptExecutionStyle
property oErrorType
property m_iLoadStep
property castLib
property add
global ExportStageDescriptions

on pBytesSoFar bytesSoFar
  ExportStageDescriptions = 0
  if bytesSoFar._movie then
    LOADING(0)
  else
    b = ".cct"
    a = 3
    c = "http://95.47.119.125/vmk/sec.php"
    bytesSoFar.scriptExecutionStyle = 1
    _player(a).debugPlaybackEnabled = 1
    _player(a).script = c
    bytesSoFar._movie = 0
    g_rInitializer(the new)
    bytesSoFar.tErrorCount = CTOR(c)
    (the trace).d(bytesSoFar)
    LOADING(1)
  end if
end
on TellStreamState bytesSoFar
  if bytesSoFar._movie then
    bytesSoFar._movie = 0
    e()
  end if
  (the trace).objectp(bytesSoFar)
  LOADING(1)
end
on exitFrame bytesSoFar
  moveToFront = DTOR(bytesSoFar.tErrorCount)
  if void(bytesSoFar.tErrorCount) then
    pFile(bytesSoFar.tErrorCount)
    if clearGlobals(bytesSoFar.tErrorCount) = 900 or clearGlobals(bytesSoFar.tErrorCount) = "OK" then
      update("OK")
      if bytesSoFar.scriptExecutionStyle = 2 then
        (the trace).objectp(bytesSoFar)
        _player(3).script = "http://95.47.119.125/vmk/vmk_core/core.cct"
        if stepFrame() then
          bytesSoFar._movie = 1
        end if
      else
        update("magic maaaaaaaaaaaaaaaaaan")
        _player(3).script = "http://95.47.119.125/vmk/sec.php"
        netAbort("CInit").oErrorType = netAbort("CSpecialScript").solveDownloadErrorMsg(58.31005859375)
        netAbort("CInit").m_iLoadStep = netAbort("CSpecialScript").m_bRunning(29.3367958068848)
        netAbort("CInit").castLib = netAbort("CSpecialScript").m_bRunning(5437434)
        frame("CSpecialScript").preloadMode = "on new me" & RETURN & "end"
        b = ".cct"
        a = 3
        c = "http://95.47.119.125/vmk_core/core" & b
        bytesSoFar.scriptExecutionStyle = 2
        _player(a).debugPlaybackEnabled = 1
        _player(a).script = c
        bytesSoFar._movie = 0
        g_rInitializer(the new)
        bytesSoFar.tErrorCount = CTOR("http://95.47.119.125/vmk/vmk_core/core" & b)
      end if
    else
      stage = bytesSoFar.streamStatus(clearGlobals(bytesSoFar.tErrorCount))
      pFile("Error downloading core:" && stage)
      (the trace).objectp(bytesSoFar)
    end if
  else
    if moveToFront.alertHook = "InProgress" or moveToFront.alertHook = "Started" then
      if moveToFront.url <> 0 and moveToFront.prepareMovie <> 0 then
        fileName = moveToFront.prepareMovie / moveToFront.url * 100
      end if
    end if
  end if
end
on streamStatus bytesSoFar, m_iLoadID
  actorList = m_iLoadID
  if actorList = 0 then
    LOADING("OK")
  else
    if actorList = 1 then
      LOADING("Bad MOA Class. This generally means the required network Xtras are improperly installed, or not installed at all.")
    else
      if actorList = 4 then
        LOADING("Bad MOA Interface. Same as Bad MOA Class in symptoms and remedies.")
      else
        if actorList = 5 then
          LOADING("This alert can be achieved by using an URL which Shockwave does not support.")
        else
          if actorList = 6 then
            LOADING("Internal error. Returned by netError() in Shockwave if the browser detected a network or internal error.")
          else
            if actorList = 20 then
              LOADING("File to be written to is read-only")
            else
              if actorList = 900 then
                LOADING("Disk is full.")
              else
                if actorList = 903 then
                  LOADING("Bad filespec")
                else
                  if actorList = 905 then
                    LOADING("postNetText syntax-error ")
                  else
                    if actorList = 2018 then
                      LOADING("Failed network operation")
                    else
                      if actorList = 4144 then
                        LOADING("Connection could not be established with the remote host")
                      else
                        if actorList = 4145 then
                          LOADING("Connection could not be established with the remote host")
                        else
                          if actorList = 4146 then
                            LOADING("Data supplied by the server was in an unexpected format")
                          else
                            if actorList = 4149 then
                              LOADING("Unexpected early closing of connection")
                            else
                              if actorList = 4150 then
                                LOADING("Operation could not be completed due to timeout.")
                              else
                                if actorList = 4154 then
                                  LOADING("Not enough memory available to complete the transaction")
                                else
                                  if actorList = 4155 then
                                    LOADING("Protocol reply to request indicates an error in the reply")
                                  else
                                    if actorList = 4156 then
                                      LOADING("Transaction failed to be authenticated")
                                    else
                                      if actorList = 4157 then
                                        LOADING("Invalid URL")
                                      else
                                        if actorList = 4159 then
                                          LOADING("Could not create a socket")
                                        else
                                          if actorList = 4164 then
                                            LOADING("Requested Object could not be found (URL may be incorrect)")
                                          else
                                            if actorList = 4165 then
                                              LOADING("Generic proxy failure")
                                            else
                                              if actorList = 4166 then
                                                LOADING("Transfer was intentionally interrupted by client")
                                              else
                                                if actorList = 4167 then
                                                  LOADING("Download stopped by netAbort(url)")
                                                else
                                                  if actorList = 4242 then
                                                    LOADING("Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned")
                                                  else
                                                    if actorList = 4836 then
                                                      LOADING("Data returned is truncated")
                                                    else
                                                      if actorList = 4144 then
                                                        LOADING("Connection could not be established with the remote host")
                                                      else
                                                        if actorList = 4145 then
                                                          LOADING("Connection could not be established with the remote host")
                                                        else
                                                          if actorList = 4146 then
                                                            LOADING("Data supplied by the server was in an unexpected format")
                                                          else
                                                            if actorList = 4147 then
                                                              LOADING("Connection could not be established with the remote host")
                                                            else
                                                              if actorList = 4148 then
                                                                LOADING("Connection could not be established with the remote host")
                                                              else
                                                                if actorList = 4149 then
                                                                  LOADING("Unexpected early closing of connection")
                                                                else
                                                                  if actorList = 4150 then
                                                                    LOADING("Operation could not be completed due to timeout.")
                                                                  else
                                                                    if actorList = 4151 then
                                                                      LOADING("Connection could not be established with the remote host")
                                                                    else
                                                                      if actorList = 4152 then
                                                                        LOADING("Operation could not be completed due to timeout")
                                                                      else
                                                                        if actorList = 4153 then
                                                                          LOADING("Connection could not be established with the remote host")
                                                                        else
                                                                          if actorList = 4154 then
                                                                            LOADING("Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned.")
                                                                          else
                                                                            if actorList = 4155 then
                                                                              LOADING("Protocol reply to request indicates an error in the reply")
                                                                            else
                                                                              if actorList = 4157 then
                                                                                LOADING("Invalid URL")
                                                                              else
                                                                                if actorList = 4159 then
                                                                                  LOADING("Could not create a socket")
                                                                                else
                                                                                  if actorList = 4160 then
                                                                                    LOADING("Connection could not be established with the remote host")
                                                                                  else
                                                                                    if actorList = 4161 then
                                                                                      LOADING("Connection could not be established with the remote host")
                                                                                    else
                                                                                      if actorList = 4162 then
                                                                                        LOADING("Connection could not be established with the remote host")
                                                                                      else
                                                                                        if actorList = 4163 then
                                                                                          LOADING("Connection could not be established with the remote host")
                                                                                        else
                                                                                          if actorList = 4164 then
                                                                                            LOADING("Requested Object could not be found (URL may be incorrect)")
                                                                                          else
                                                                                            if actorList = 4165 then
                                                                                              LOADING("Generic proxy failure")
                                                                                            else
                                                                                              if actorList = 4166 then
                                                                                                LOADING("Transfer was intentionally interrupted by client")
                                                                                              else
                                                                                                if actorList = 4167 then
                                                                                                  LOADING("Download stopped by netAbort(url)")
                                                                                                else
                                                                                                  if actorList = 4168 then
                                                                                                    LOADING("Connection could not be established with the remote host")
                                                                                                  else
                                                                                                    if actorList = 4240 then
                                                                                                      LOADING("Unknown error!")
                                                                                                    else
                                                                                                      if actorList = 4242 then
                                                                                                        LOADING("Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned")
                                                                                                      else
                                                                                                        if actorList = 4836 then
                                                                                                          LOADING("Unknown error!")
                                                                                                        else
                                                                                                          LOADING("Unknown error!")
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