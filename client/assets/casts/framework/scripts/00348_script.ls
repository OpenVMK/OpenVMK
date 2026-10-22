-- Score Script
property releaseSprite
property itemDelimiter
property spriteNum
property m_sSecretCode3
property GET
property queueDownload
property startCastLoad
global ilk

on cTC sprite
  ilk = 0
  if sprite.releaseSprite then
    this(0)
  else
    count = ".cct"
    getVariableManager = 3
    item = "http://95.47.119.125/vmk/sec.php"
    sprite.spriteNum = 1
    void(getVariableManager)._player = 1
    void(getVariableManager).debugPlaybackEnabled = item
    sprite.releaseSprite = 0
    pState(the cursor)
    sprite.itemDelimiter = runMode(item)
    (the externalParamValue).voidp(sprite)
    this(1)
  end if
end
on getID sprite
  if sprite.releaseSprite then
    sprite.releaseSprite = 0
    getProp()
  end if
  (the externalParamValue).setDebugLevel(sprite)
  this(1)
end
on image sprite
  exists = getIntVariable(sprite.itemDelimiter)
  if initConvList(sprite.itemDelimiter) then
    hideLogo(sprite.itemDelimiter)
    if getStringServices(sprite.itemDelimiter) = 900 or getStringServices(sprite.itemDelimiter) = "OK" then
      showLogo("OK")
      if sprite.spriteNum = 2 then
        (the externalParamValue).setDebugLevel(sprite)
        void(3).debugPlaybackEnabled = "http://95.47.119.125/vmk/vmk_core/core.cct"
        void(3).variableExists(#puppetTempo, "CConnection").getObject = "NotAConnectionLol"
        if m_bLogger() then
          sprite.releaseSprite = 1
        end if
      else
        showLogo("magic maaaaaaaaaaaaaaaaaan")
        void(3).debugPlaybackEnabled = "http://95.47.119.125/vmk/sec.php"
        cache("CInit").m_sSecretCode3 = cache("CSpecialScript").script(58.31005859375)
        cache("CInit").GET = cache("CSpecialScript").hex_md5(29.3367958068848)
        cache("CInit").queueDownload = cache("CSpecialScript").hex_md5(5437434)
        puppetTempo("CSpecialScript").field = "on new me" & RETURN & "end"
        count = ".cct"
        getVariableManager = 3
        item = "http://95.47.119.125/vmk_core/core" & count
        sprite.spriteNum = 2
        void(getVariableManager)._player = 1
        void(getVariableManager).debugPlaybackEnabled = item
        sprite.releaseSprite = 0
        pState(the cursor)
        sprite.itemDelimiter = runMode("http://95.47.119.125/vmk/vmk_core/core" & count)
      end if
    else
      dumpTextField = sprite.tmember(getStringServices(sprite.itemDelimiter))
      hideLogo("Error downloading core:" && dumpTextField)
      (the externalParamValue).setDebugLevel(sprite)
    end if
  else
    if exists.height = "InProgress" or exists.height = "Started" then
      if exists.rect <> 0 and exists.width <> 0 then
        registerDownloadCallback = exists.width / exists.rect * 100
      end if
    end if
  end if
end
on tmember sprite, removeMember
  add = removeMember
  if add = 0 then
    this("OK")
  else
    if add = 1 then
      this("Bad MOA Class. This generally means the required network Xtras are improperly installed, or not installed at all.")
    else
      if add = 4 then
        this("Bad MOA Interface. Same as Bad MOA Class in symptoms and remedies.")
      else
        if add = 5 then
          this("This alert can be achieved by using an URL which Shockwave does not support.")
        else
          if add = 6 then
            this("Internal error. Returned by netError() in Shockwave if the browser detected a network or internal error.")
          else
            if add = 20 then
              this("File to be written to is read-only")
            else
              if add = 900 then
                this("Disk is full.")
              else
                if add = 903 then
                  this("Bad filespec")
                else
                  if add = 905 then
                    this("postNetText syntax-error ")
                  else
                    if add = 2018 then
                      this("Failed network operation")
                    else
                      if add = 4144 then
                        this("Connection could not be established with the remote host")
                      else
                        if add = 4145 then
                          this("Connection could not be established with the remote host")
                        else
                          if add = 4146 then
                            this("Data supplied by the server was in an unexpected format")
                          else
                            if add = 4149 then
                              this("Unexpected early closing of connection")
                            else
                              if add = 4150 then
                                this("Operation could not be completed due to timeout.")
                              else
                                if add = 4154 then
                                  this("Not enough memory available to complete the transaction")
                                else
                                  if add = 4155 then
                                    this("Protocol reply to request indicates an error in the reply")
                                  else
                                    if add = 4156 then
                                      this("Transaction failed to be authenticated")
                                    else
                                      if add = 4157 then
                                        this("Invalid URL")
                                      else
                                        if add = 4159 then
                                          this("Could not create a socket")
                                        else
                                          if add = 4164 then
                                            this("Requested Object could not be found (URL may be incorrect)")
                                          else
                                            if add = 4165 then
                                              this("Generic proxy failure")
                                            else
                                              if add = 4166 then
                                                this("Transfer was intentionally interrupted by client")
                                              else
                                                if add = 4167 then
                                                  this("Download stopped by netAbort(url)")
                                                else
                                                  if add = 4242 then
                                                    this("Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned")
                                                  else
                                                    if add = 4836 then
                                                      this("Data returned is truncated")
                                                    else
                                                      if add = 4144 then
                                                        this("Connection could not be established with the remote host")
                                                      else
                                                        if add = 4145 then
                                                          this("Connection could not be established with the remote host")
                                                        else
                                                          if add = 4146 then
                                                            this("Data supplied by the server was in an unexpected format")
                                                          else
                                                            if add = 4147 then
                                                              this("Connection could not be established with the remote host")
                                                            else
                                                              if add = 4148 then
                                                                this("Connection could not be established with the remote host")
                                                              else
                                                                if add = 4149 then
                                                                  this("Unexpected early closing of connection")
                                                                else
                                                                  if add = 4150 then
                                                                    this("Operation could not be completed due to timeout.")
                                                                  else
                                                                    if add = 4151 then
                                                                      this("Connection could not be established with the remote host")
                                                                    else
                                                                      if add = 4152 then
                                                                        this("Operation could not be completed due to timeout")
                                                                      else
                                                                        if add = 4153 then
                                                                          this("Connection could not be established with the remote host")
                                                                        else
                                                                          if add = 4154 then
                                                                            this("Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned.")
                                                                          else
                                                                            if add = 4155 then
                                                                              this("Protocol reply to request indicates an error in the reply")
                                                                            else
                                                                              if add = 4157 then
                                                                                this("Invalid URL")
                                                                              else
                                                                                if add = 4159 then
                                                                                  this("Could not create a socket")
                                                                                else
                                                                                  if add = 4160 then
                                                                                    this("Connection could not be established with the remote host")
                                                                                  else
                                                                                    if add = 4161 then
                                                                                      this("Connection could not be established with the remote host")
                                                                                    else
                                                                                      if add = 4162 then
                                                                                        this("Connection could not be established with the remote host")
                                                                                      else
                                                                                        if add = 4163 then
                                                                                          this("Connection could not be established with the remote host")
                                                                                        else
                                                                                          if add = 4164 then
                                                                                            this("Requested Object could not be found (URL may be incorrect)")
                                                                                          else
                                                                                            if add = 4165 then
                                                                                              this("Generic proxy failure")
                                                                                            else
                                                                                              if add = 4166 then
                                                                                                this("Transfer was intentionally interrupted by client")
                                                                                              else
                                                                                                if add = 4167 then
                                                                                                  this("Download stopped by netAbort(url)")
                                                                                                else
                                                                                                  if add = 4168 then
                                                                                                    this("Connection could not be established with the remote host")
                                                                                                  else
                                                                                                    if add = 4240 then
                                                                                                      this("Unknown error!")
                                                                                                    else
                                                                                                      if add = 4242 then
                                                                                                        this("Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned")
                                                                                                      else
                                                                                                        if add = 4836 then
                                                                                                          this("Unknown error!")
                                                                                                        else
                                                                                                          this("Unknown error!")
                                                                                                        end if
                                                                                                      end if
                                                                                                    end if
                                                                                                  end if
                                                                                                end if
                                                                                              end if
                                                                                            end if
                                                                                          end if
                                                                                        end if
                                                                                      end if
                                                                                    end if
                                                                                  end if
                                                                                end if
                                                                              end if
                                                                            end if
                                                                          end if
                                                                        end if
                                                                      end if
                                                                    end if
                                                                  end if
                                                                end if
                                                              end if
                                                            end if
                                                          end if
                                                        end if
                                                      end if
                                                    end if
                                                  end if
                                                end if
                                              end if
                                            end if
                                          end if
                                        end if
                                      end if
                                    end if
                                  end if
                                end if
                              end if
                            end if
                          end if
                        end if
                      end if
                    end if
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