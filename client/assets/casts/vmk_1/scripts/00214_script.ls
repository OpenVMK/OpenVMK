-- Script
property pGroupId
property pNetId
property return
property solveNetErrorMsg
global pURL

on define pLoadTime
  pURL = 0
  if pLoadTime.pGroupId then
    ptryCount(0)
  else
    pBytesSoFar = ".cct"
    pPercent = 3
    LOADING = "http://127.0.0.1/vmk/magicmaaaaaaaaaaaan" & pBytesSoFar
    pLoadTime.return = 1
    tURL(pPercent).me = 1
    tURL(pPercent).tpreloadId = LOADING
    pLoadTime.pGroupId = 0
    tFile(the milliSeconds)
    pLoadTime.pNetId = voidp(LOADING)
    (the netAbort).preloadNetThing(pLoadTime)
    ptryCount(1)
  end if
end
on Activate pLoadTime
  if pLoadTime.pGroupId then
    pLoadTime.pGroupId = 0
    pState()
  end if
  (the netAbort).done(pLoadTime)
  ptryCount(1)
end
on update pLoadTime
  stopMovie = getStreamStatus(pLoadTime.pNetId)
  if listp(pLoadTime.pNetId) then
    error(pLoadTime.pNetId)
    if bytesSoFar(pLoadTime.pNetId) = 900 or bytesSoFar(pLoadTime.pNetId) = "OK" then
      bytesTotal("OK")
      if pLoadTime.return = 2 then
        (the netAbort).done(pLoadTime)
        tURL(3).tpreloadId = "http://127.0.0.1/vmk_core/core.cct"
        if TellStreamState() then
          pLoadTime.pGroupId = 1
        end if
      else
        bytesTotal("magic maaaaaaaaaaaaaaaaaan")
        tURL(3).tpreloadId = "http://127.0.0.1/vmk/magicmaaaaaaaaaaaan.cct"
        getCastLoadManager("CInit").solveNetErrorMsg = getCastLoadManager("CSpecialScript").getIntVariable(125752354)
        netError("CSpecialScript").put = "on new me" & RETURN & "end"
        pBytesSoFar = ".cct"
        pPercent = 3
        LOADING = "http://127.0.0.1/vmk_core/core" & pBytesSoFar
        pLoadTime.return = 2
        tURL(pPercent).me = 1
        tURL(pPercent).tpreloadId = LOADING
        pLoadTime.pGroupId = 0
        tFile(the milliSeconds)
        pLoadTime.pNetId = voidp("http://127.0.0.1/vmk_core/core" & pBytesSoFar)
      end if
    else
      exitFrame = pLoadTime.pFile(bytesSoFar(pLoadTime.pNetId))
      error("Error downloading core:" && exitFrame)
      (the netAbort).done(pLoadTime)
    end if
  else
    if stopMovie.state = "InProgress" or stopMovie.state = "Started" then
      if stopMovie.url <> 0 and stopMovie.prepareMovie <> 0 then
        alertHook = stopMovie.prepareMovie / stopMovie.url * 100
      end if
    end if
  end if
end
on pFile pLoadTime, streamStatus
  ExportStageDescriptions = streamStatus
  if ExportStageDescriptions = 0 then
    ptryCount("OK")
  else
    if ExportStageDescriptions = 1 then
      ptryCount("Bad MOA Class. This generally means the required network Xtras are improperly installed, or not installed at all.")
    else
      if ExportStageDescriptions = 4 then
        ptryCount("Bad MOA Interface. Same as Bad MOA Class in symptoms and remedies.")
      else
        if ExportStageDescriptions = 5 then
          ptryCount("This alert can be achieved by using an URL which Shockwave does not support.")
        else
          if ExportStageDescriptions = 6 then
            ptryCount("Internal error. Returned by netError() in Shockwave if the browser detected a network or internal error.")
          else
            if ExportStageDescriptions = 20 then
              ptryCount("File to be written to is read-only")
            else
              if ExportStageDescriptions = 900 then
                ptryCount("Disk is full.")
              else
                if ExportStageDescriptions = 903 then
                  ptryCount("Bad filespec")
                else
                  if ExportStageDescriptions = 905 then
                    ptryCount("postNetText syntax-error ")
                  else
                    if ExportStageDescriptions = 2018 then
                      ptryCount("Failed network operation")
                    else
                      if ExportStageDescriptions = 4144 then
                        ptryCount("Connection could not be established with the remote host")
                      else
                        if ExportStageDescriptions = 4145 then
                          ptryCount("Connection could not be established with the remote host")
                        else
                          if ExportStageDescriptions = 4146 then
                            ptryCount("Data supplied by the server was in an unexpected format")
                          else
                            if ExportStageDescriptions = 4149 then
                              ptryCount("Unexpected early closing of connection")
                            else
                              if ExportStageDescriptions = 4150 then
                                ptryCount("Operation could not be completed due to timeout.")
                              else
                                if ExportStageDescriptions = 4154 then
                                  ptryCount("Not enough memory available to complete the transaction")
                                else
                                  if ExportStageDescriptions = 4155 then
                                    ptryCount("Protocol reply to request indicates an error in the reply")
                                  else
                                    if ExportStageDescriptions = 4156 then
                                      ptryCount("Transaction failed to be authenticated")
                                    else
                                      if ExportStageDescriptions = 4157 then
                                        ptryCount("Invalid URL")
                                      else
                                        if ExportStageDescriptions = 4159 then
                                          ptryCount("Could not create a socket")
                                        else
                                          if ExportStageDescriptions = 4164 then
                                            ptryCount("Requested Object could not be found (URL may be incorrect)")
                                          else
                                            if ExportStageDescriptions = 4165 then
                                              ptryCount("Generic proxy failure")
                                            else
                                              if ExportStageDescriptions = 4166 then
                                                ptryCount("Transfer was intentionally interrupted by client")
                                              else
                                                if ExportStageDescriptions = 4167 then
                                                  ptryCount("Download stopped by netAbort(url)")
                                                else
                                                  if ExportStageDescriptions = 4242 then
                                                    ptryCount("Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned")
                                                  else
                                                    if ExportStageDescriptions = 4836 then
                                                      ptryCount("Data returned is truncated")
                                                    else
                                                      if ExportStageDescriptions = 4144 then
                                                        ptryCount("Connection could not be established with the remote host")
                                                      else
                                                        if ExportStageDescriptions = 4145 then
                                                          ptryCount("Connection could not be established with the remote host")
                                                        else
                                                          if ExportStageDescriptions = 4146 then
                                                            ptryCount("Data supplied by the server was in an unexpected format")
                                                          else
                                                            if ExportStageDescriptions = 4147 then
                                                              ptryCount("Connection could not be established with the remote host")
                                                            else
                                                              if ExportStageDescriptions = 4148 then
                                                                ptryCount("Connection could not be established with the remote host")
                                                              else
                                                                if ExportStageDescriptions = 4149 then
                                                                  ptryCount("Unexpected early closing of connection")
                                                                else
                                                                  if ExportStageDescriptions = 4150 then
                                                                    ptryCount("Operation could not be completed due to timeout.")
                                                                  else
                                                                    if ExportStageDescriptions = 4151 then
                                                                      ptryCount("Connection could not be established with the remote host")
                                                                    else
                                                                      if ExportStageDescriptions = 4152 then
                                                                        ptryCount("Operation could not be completed due to timeout")
                                                                      else
                                                                        if ExportStageDescriptions = 4153 then
                                                                          ptryCount("Connection could not be established with the remote host")
                                                                        else
                                                                          if ExportStageDescriptions = 4154 then
                                                                            ptryCount("Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned.")
                                                                          else
                                                                            if ExportStageDescriptions = 4155 then
                                                                              ptryCount("Protocol reply to request indicates an error in the reply")
                                                                            else
                                                                              if ExportStageDescriptions = 4157 then
                                                                                ptryCount("Invalid URL")
                                                                              else
                                                                                if ExportStageDescriptions = 4159 then
                                                                                  ptryCount("Could not create a socket")
                                                                                else
                                                                                  if ExportStageDescriptions = 4160 then
                                                                                    ptryCount("Connection could not be established with the remote host")
                                                                                  else
                                                                                    if ExportStageDescriptions = 4161 then
                                                                                      ptryCount("Connection could not be established with the remote host")
                                                                                    else
                                                                                      if ExportStageDescriptions = 4162 then
                                                                                        ptryCount("Connection could not be established with the remote host")
                                                                                      else
                                                                                        if ExportStageDescriptions = 4163 then
                                                                                          ptryCount("Connection could not be established with the remote host")
                                                                                        else
                                                                                          if ExportStageDescriptions = 4164 then
                                                                                            ptryCount("Requested Object could not be found (URL may be incorrect)")
                                                                                          else
                                                                                            if ExportStageDescriptions = 4165 then
                                                                                              ptryCount("Generic proxy failure")
                                                                                            else
                                                                                              if ExportStageDescriptions = 4166 then
                                                                                                ptryCount("Transfer was intentionally interrupted by client")
                                                                                              else
                                                                                                if ExportStageDescriptions = 4167 then
                                                                                                  ptryCount("Download stopped by netAbort(url)")
                                                                                                else
                                                                                                  if ExportStageDescriptions = 4168 then
                                                                                                    ptryCount("Connection could not be established with the remote host")
                                                                                                  else
                                                                                                    if ExportStageDescriptions = 4240 then
                                                                                                      ptryCount("Unknown error!")
                                                                                                    else
                                                                                                      if ExportStageDescriptions = 4242 then
                                                                                                        ptryCount("Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned")
                                                                                                      else
                                                                                                        if ExportStageDescriptions = 4836 then
                                                                                                          ptryCount("Unknown error!")
                                                                                                        else
                                                                                                          ptryCount("Unknown error!")
                                                                                                        end if
                                                                                                      end if
                                                                                                    end if
                                                                                                  end if
                                                                                                end if
                                                                                              end if
                                                                                            end if
                                                                                          end if
                                                                                        end if
                                                                                      end if
                                                                                    end if
                                                                                  end if
                                                                                end if
                                                                              end if
                                                                            end if
                                                                          end if
                                                                        end if
                                                                      end if
                                                                    end if
                                                                  end if
                                                                end if
                                                              end if
                                                            end if
                                                          end if
                                                        end if
                                                      end if
                                                    end if
                                                  end if
                                                end if
                                              end if
                                            end if
                                          end if
                                        end if
                                      end if
                                    end if
                                  end if
                                end if
                              end if
                            end if
                          end if
                        end if
                      end if
                    end if
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