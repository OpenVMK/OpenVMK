-- Score Script
property tFilename
property tCast
global tParamDelim

on propList tLoadID
  tParamDelim = 0
  if tLoadID.tFilename then
    cTC(0)
  else
    i = ".cct"
    tDelim = 3
    tParam = the getVariable & "vmk_core/core" & i
    tCastList(tDelim).tTxtFile = 1
    tCastList(tDelim).tVarMgr = tParam
    tLoadID.tFilename = 0
    tURL(the point)
    tLoadID.tCast = tOrigin(the getVariable & "vmk_core/core" & i)
    (the tMemName).tCode(tLoadID)
    cTC(1)
  end if
end
on createMember tLoadID
  if tLoadID.tFilename then
    tLoadID.tFilename = 0
    tCastCount()
  end if
  (the tMemName).tMemNum(tLoadID)
  cTC(1)
end
on tPublicKey tLoadID
  stopMovie = numToChar(tLoadID.tCast)
  if str(tLoadID.tCast) then
    executeMessage(out(tLoadID.tCast))
    if out(tLoadID.tCast) = 900 or out(tLoadID.tCast) = "OK" then
      (the tMemName).tMemNum(tLoadID)
      tCastList(3).tVarMgr = the getVariable & "vmk_core/core" & ".cct"
      if prepareMovie() then
        tLoadID.tFilename = 1
      end if
    else
      put = tLoadID.alertHook(out(tLoadID.tCast))
      executeMessage("Error downloading core:" && put)
    end if
  else
    if stopMovie.tstate = "InProgress" or stopMovie.tstate = "Started" then
      if stopMovie.me <> 0 and stopMovie.error <> 0 then
        exitFrame = stopMovie.error / stopMovie.me * 100
      end if
    end if
  end if
end
on tNewList tLoadID, streamStatus
  ExportStageDescriptions = streamStatus
  if ExportStageDescriptions = 0 then
    cTC("OK")
  else
    if ExportStageDescriptions = 1 then
      cTC("Bad MOA Class. This generally means the required network Xtras are improperly installed, or not installed at all.")
    else
      if ExportStageDescriptions = 4 then
        cTC("Bad MOA Interface. Same as Bad MOA Class in symptoms and remedies.")
      else
        if ExportStageDescriptions = 5 then
          cTC("This alert can be achieved by using an URL which Shockwave does not support.")
        else
          if ExportStageDescriptions = 6 then
            cTC("Internal error. Returned by netError() in Shockwave if the browser detected a network or internal error.")
          else
            if ExportStageDescriptions = 20 then
              cTC("File to be written to is read-only")
            else
              if ExportStageDescriptions = 900 then
                cTC("Disk is full.")
              else
                if ExportStageDescriptions = 903 then
                  cTC("Bad filespec")
                else
                  if ExportStageDescriptions = 905 then
                    cTC("postNetText syntax-error ")
                  else
                    if ExportStageDescriptions = 2018 then
                      cTC("Failed network operation")
                    else
                      if ExportStageDescriptions = 4144 then
                        cTC("Connection could not be established with the remote host")
                      else
                        if ExportStageDescriptions = 4145 then
                          cTC("Connection could not be established with the remote host")
                        else
                          if ExportStageDescriptions = 4146 then
                            cTC("Data supplied by the server was in an unexpected format")
                          else
                            if ExportStageDescriptions = 4149 then
                              cTC("Unexpected early closing of connection")
                            else
                              if ExportStageDescriptions = 4150 then
                                cTC("Operation could not be completed due to timeout.")
                              else
                                if ExportStageDescriptions = 4154 then
                                  cTC("Not enough memory available to complete the transaction")
                                else
                                  if ExportStageDescriptions = 4155 then
                                    cTC("Protocol reply to request indicates an error in the reply")
                                  else
                                    if ExportStageDescriptions = 4156 then
                                      cTC("Transaction failed to be authenticated")
                                    else
                                      if ExportStageDescriptions = 4157 then
                                        cTC("Invalid URL")
                                      else
                                        if ExportStageDescriptions = 4159 then
                                          cTC("Could not create a socket")
                                        else
                                          if ExportStageDescriptions = 4164 then
                                            cTC("Requested Object could not be found (URL may be incorrect)")
                                          else
                                            if ExportStageDescriptions = 4165 then
                                              cTC("Generic proxy failure")
                                            else
                                              if ExportStageDescriptions = 4166 then
                                                cTC("Transfer was intentionally interrupted by client")
                                              else
                                                if ExportStageDescriptions = 4167 then
                                                  cTC("Download stopped by netAbort(url)")
                                                else
                                                  if ExportStageDescriptions = 4242 then
                                                    cTC("Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned")
                                                  else
                                                    if ExportStageDescriptions = 4836 then
                                                      cTC("Data returned is truncated")
                                                    else
                                                      if ExportStageDescriptions = 4144 then
                                                        cTC("Connection could not be established with the remote host")
                                                      else
                                                        if ExportStageDescriptions = 4145 then
                                                          cTC("Connection could not be established with the remote host")
                                                        else
                                                          if ExportStageDescriptions = 4146 then
                                                            cTC("Data supplied by the server was in an unexpected format")
                                                          else
                                                            if ExportStageDescriptions = 4147 then
                                                              cTC("Connection could not be established with the remote host")
                                                            else
                                                              if ExportStageDescriptions = 4148 then
                                                                cTC("Connection could not be established with the remote host")
                                                              else
                                                                if ExportStageDescriptions = 4149 then
                                                                  cTC("Unexpected early closing of connection")
                                                                else
                                                                  if ExportStageDescriptions = 4150 then
                                                                    cTC("Operation could not be completed due to timeout.")
                                                                  else
                                                                    if ExportStageDescriptions = 4151 then
                                                                      cTC("Connection could not be established with the remote host")
                                                                    else
                                                                      if ExportStageDescriptions = 4152 then
                                                                        cTC("Operation could not be completed due to timeout")
                                                                      else
                                                                        if ExportStageDescriptions = 4153 then
                                                                          cTC("Connection could not be established with the remote host")
                                                                        else
                                                                          if ExportStageDescriptions = 4154 then
                                                                            cTC("Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned.")
                                                                          else
                                                                            if ExportStageDescriptions = 4155 then
                                                                              cTC("Protocol reply to request indicates an error in the reply")
                                                                            else
                                                                              if ExportStageDescriptions = 4157 then
                                                                                cTC("Invalid URL")
                                                                              else
                                                                                if ExportStageDescriptions = 4159 then
                                                                                  cTC("Could not create a socket")
                                                                                else
                                                                                  if ExportStageDescriptions = 4160 then
                                                                                    cTC("Connection could not be established with the remote host")
                                                                                  else
                                                                                    if ExportStageDescriptions = 4161 then
                                                                                      cTC("Connection could not be established with the remote host")
                                                                                    else
                                                                                      if ExportStageDescriptions = 4162 then
                                                                                        cTC("Connection could not be established with the remote host")
                                                                                      else
                                                                                        if ExportStageDescriptions = 4163 then
                                                                                          cTC("Connection could not be established with the remote host")
                                                                                        else
                                                                                          if ExportStageDescriptions = 4164 then
                                                                                            cTC("Requested Object could not be found (URL may be incorrect)")
                                                                                          else
                                                                                            if ExportStageDescriptions = 4165 then
                                                                                              cTC("Generic proxy failure")
                                                                                            else
                                                                                              if ExportStageDescriptions = 4166 then
                                                                                                cTC("Transfer was intentionally interrupted by client")
                                                                                              else
                                                                                                if ExportStageDescriptions = 4167 then
                                                                                                  cTC("Download stopped by netAbort(url)")
                                                                                                else
                                                                                                  if ExportStageDescriptions = 4168 then
                                                                                                    cTC("Connection could not be established with the remote host")
                                                                                                  else
                                                                                                    if ExportStageDescriptions = 4240 then
                                                                                                      cTC("Unknown error!")
                                                                                                    else
                                                                                                      if ExportStageDescriptions = 4242 then
                                                                                                        cTC("Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned")
                                                                                                      else
                                                                                                        if ExportStageDescriptions = 4836 then
                                                                                                          cTC("Unknown error!")
                                                                                                        else
                                                                                                          cTC("Unknown error!")
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