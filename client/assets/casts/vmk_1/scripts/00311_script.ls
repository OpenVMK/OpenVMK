-- Score Script
property d
property a
property c
property stage
property actorList
property add
property member
global trace

on done clearGlobals
  trace = 0
  if clearGlobals.d then
    error(0)
  else
    clearGlobals.c = 1
    clearGlobals.a = b("http://beta.myvmk.com/vmk/loading.php")
    clearGlobals.d = 0
    e(the objectp)
    (the DTOR).void(clearGlobals)
    error(1)
  end if
end
on netError clearGlobals
  if clearGlobals.d then
    clearGlobals.d = 0
    frame()
  end if
  (the DTOR).go(clearGlobals)
  error(1)
end
on CTOR clearGlobals
  netDone = foo(clearGlobals.a)
  if stepFrame(clearGlobals.a) then
    if solveDownloadErrorMsg(clearGlobals.a) = 900 or solveDownloadErrorMsg(clearGlobals.a) = "OK" then
      listp("OK")
      if clearGlobals.c = 2 then
        (the DTOR).go(clearGlobals)
        oErrorType(3).m_bRunning = "http://204.12.248.90/vmk/vmk_core/core.cct"
        oErrorType(3).m_iLoadStep(#netAbort, "CConnection").castLib = "NotAConnectionLol"
        if preloadMode() then
          clearGlobals.d = 1
        end if
      else
        listp("magic maaaaaaaaaaaaaaaaaan")
        oErrorType(3).m_bRunning = "http://beta.myvmk.com/vmk/loading.php"
        if netAbort("CSpecialScript").fileName = -1 then
          moveToFront("http://204.12.248.90/error.html")
          clearGlobals.a = 1234
          error()
        end if
        pPercent("CInit").stage = pPercent("CSpecialScript").me(58.31005859375)
        pPercent("CInit").actorList = pPercent("CSpecialScript").m_iLoadID(29.3367958068848)
        pPercent("CInit").add = pPercent("CSpecialScript").m_iLoadID(5437434)
        netAbort("CSpecialScript").preloadNetThing = "on new me" & RETURN & "end"
        t_sCstFileType = ".cct"
        stopClient = 3
        t_iCoreCastNum = "http://204.12.248.90/vmk_core/core" & t_sCstFileType
        clearGlobals.c = 2
        oErrorType(stopClient).t_sPath = 1
        oErrorType(stopClient).m_bRunning = t_iCoreCastNum
        clearGlobals.d = 0
        e(the objectp)
        clearGlobals.a = b("http://204.12.248.90/vmk/vmk_core/core" & t_sCstFileType)
      end if
    else
      startClient = clearGlobals.tErrorCount(solveDownloadErrorMsg(clearGlobals.a))
      tFile("Error downloading core:" && startClient)
      (the DTOR).go(clearGlobals)
    end if
  else
    if netDone.exitFrame = "InProgress" or netDone.exitFrame = "Started" then
      if netDone.streamStatus <> 0 and netDone.ExportStageDescriptions <> 0 then
        deleteOne = netDone.ExportStageDescriptions / netDone.streamStatus * 100
      end if
    end if
  end if
end
on tErrorCount clearGlobals, handlers
  m_sSecretCode = handlers
  if m_sSecretCode = 0 then
    error("OK")
  else
    if m_sSecretCode = 1 then
      error("Bad MOA Class. This generally means the required network Xtras are improperly installed, or not installed at all.")
    else
      if m_sSecretCode = 4 then
        error("Bad MOA Interface. Same as Bad MOA Class in symptoms and remedies.")
      else
        if m_sSecretCode = 5 then
          error("This alert can be achieved by using an URL which Shockwave does not support.")
        else
          if m_sSecretCode = 6 then
            error("Internal error. Returned by netError() in Shockwave if the browser detected a network or internal error.")
          else
            if m_sSecretCode = 20 then
              error("File to be written to is read-only")
            else
              if m_sSecretCode = 900 then
                error("Disk is full.")
              else
                if m_sSecretCode = 903 then
                  error("Bad filespec")
                else
                  if m_sSecretCode = 905 then
                    error("postNetText syntax-error ")
                  else
                    if m_sSecretCode = 2018 then
                      error("Failed network operation")
                    else
                      if m_sSecretCode = 4144 then
                        error("Connection could not be established with the remote host")
                      else
                        if m_sSecretCode = 4145 then
                          error("Connection could not be established with the remote host")
                        else
                          if m_sSecretCode = 4146 then
                            error("Data supplied by the server was in an unexpected format")
                          else
                            if m_sSecretCode = 4149 then
                              error("Unexpected early closing of connection")
                            else
                              if m_sSecretCode = 4150 then
                                error("Operation could not be completed due to timeout.")
                              else
                                if m_sSecretCode = 4154 then
                                  error("Not enough memory available to complete the transaction")
                                else
                                  if m_sSecretCode = 4155 then
                                    error("Protocol reply to request indicates an error in the reply")
                                  else
                                    if m_sSecretCode = 4156 then
                                      error("Transaction failed to be authenticated")
                                    else
                                      if m_sSecretCode = 4157 then
                                        error("Invalid URL")
                                      else
                                        if m_sSecretCode = 4159 then
                                          error("Could not create a socket")
                                        else
                                          if m_sSecretCode = 4164 then
                                            error("Requested Object could not be found (URL may be incorrect)")
                                          else
                                            if m_sSecretCode = 4165 then
                                              error("Generic proxy failure")
                                            else
                                              if m_sSecretCode = 4166 then
                                                error("Transfer was intentionally interrupted by client")
                                              else
                                                if m_sSecretCode = 4167 then
                                                  error("Download stopped by netAbort(url)")
                                                else
                                                  if m_sSecretCode = 4242 then
                                                    error("Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned")
                                                  else
                                                    if m_sSecretCode = 4836 then
                                                      error("Data returned is truncated")
                                                    else
                                                      if m_sSecretCode = 4144 then
                                                        error("Connection could not be established with the remote host")
                                                      else
                                                        if m_sSecretCode = 4145 then
                                                          error("Connection could not be established with the remote host")
                                                        else
                                                          if m_sSecretCode = 4146 then
                                                            error("Data supplied by the server was in an unexpected format")
                                                          else
                                                            if m_sSecretCode = 4147 then
                                                              error("Connection could not be established with the remote host")
                                                            else
                                                              if m_sSecretCode = 4148 then
                                                                error("Connection could not be established with the remote host")
                                                              else
                                                                if m_sSecretCode = 4149 then
                                                                  error("Unexpected early closing of connection")
                                                                else
                                                                  if m_sSecretCode = 4150 then
                                                                    error("Operation could not be completed due to timeout.")
                                                                  else
                                                                    if m_sSecretCode = 4151 then
                                                                      error("Connection could not be established with the remote host")
                                                                    else
                                                                      if m_sSecretCode = 4152 then
                                                                        error("Operation could not be completed due to timeout")
                                                                      else
                                                                        if m_sSecretCode = 4153 then
                                                                          error("Connection could not be established with the remote host")
                                                                        else
                                                                          if m_sSecretCode = 4154 then
                                                                            error("Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned.")
                                                                          else
                                                                            if m_sSecretCode = 4155 then
                                                                              error("Protocol reply to request indicates an error in the reply")
                                                                            else
                                                                              if m_sSecretCode = 4157 then
                                                                                error("Invalid URL")
                                                                              else
                                                                                if m_sSecretCode = 4159 then
                                                                                  error("Could not create a socket")
                                                                                else
                                                                                  if m_sSecretCode = 4160 then
                                                                                    error("Connection could not be established with the remote host")
                                                                                  else
                                                                                    if m_sSecretCode = 4161 then
                                                                                      error("Connection could not be established with the remote host")
                                                                                    else
                                                                                      if m_sSecretCode = 4162 then
                                                                                        error("Connection could not be established with the remote host")
                                                                                      else
                                                                                        if m_sSecretCode = 4163 then
                                                                                          error("Connection could not be established with the remote host")
                                                                                        else
                                                                                          if m_sSecretCode = 4164 then
                                                                                            error("Requested Object could not be found (URL may be incorrect)")
                                                                                          else
                                                                                            if m_sSecretCode = 4165 then
                                                                                              error("Generic proxy failure")
                                                                                            else
                                                                                              if m_sSecretCode = 4166 then
                                                                                                error("Transfer was intentionally interrupted by client")
                                                                                              else
                                                                                                if m_sSecretCode = 4167 then
                                                                                                  error("Download stopped by netAbort(url)")
                                                                                                else
                                                                                                  if m_sSecretCode = 4168 then
                                                                                                    error("Connection could not be established with the remote host")
                                                                                                  else
                                                                                                    if m_sSecretCode = 4240 then
                                                                                                      error("Unknown error!")
                                                                                                    else
                                                                                                      if m_sSecretCode = 4242 then
                                                                                                        error("Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned")
                                                                                                      else
                                                                                                        if m_sSecretCode = 4836 then
                                                                                                          error("Unknown error!")
                                                                                                        else
                                                                                                          error("Unknown error!")
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