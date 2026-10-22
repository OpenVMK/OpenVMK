-- Parent Script
property m_ar_frames
property m_i_frameCounter
property m_bActive
property m_ar_spriteData

on construct me
  m_bInited = 0
  m_ar_frames = []
  m_i_frameCounter = 0
  m_bActive = 0
  m_ar_spriteData = [:]
  m_ar_spriteData.sort()
  return 1
end
on deconstruct me
  m_i_frameCounter = 0
  m_bActive = 0
  repeat with tFrame in m_ar_frames
  end repeat
  return 1
end
on GetParam me, i_rParam
  tPos = m_ar_spriteData.findPos(i_rParam)
  if tPos <> 0 then
    return m_ar_spriteData[tPos]
  else
    return 0
  end if
end
on SetParam me, i_iParam, i_iParamValue
  m_ar_spriteData[i_iParam] = i_iParamValue
end
on Init me, i_ar_spriteData, i_ar_spriteDefaults
  i_ar_spriteData.sort()
  t_ar_spriteDefaults = i_ar_spriteDefaults.duplicate()
  repeat with i = 1 to i_ar_spriteData.sprite.count
    tProp = i_ar_spriteData.sprite.getPropAt(i)
    tSymbol = symbol(tProp)
    tDefaultValue = t_ar_spriteDefaults.getaProp(tSymbol)
    if not voidp(tDefaultValue) then
      if tDefaultValue.ilk = #string then
        if tSymbol = #member then
          tNewValue = member(i_ar_spriteData.sprite[tProp])
        else
          tNewValue = i_ar_spriteData.sprite[tProp]
        end if
      else
        tNewValue = value(i_ar_spriteData.sprite[tProp])
      end if
    else
      tNewValue = i_ar_spriteData.sprite[tProp]
    end if
    t_ar_spriteDefaults[tSymbol] = tNewValue
    m_ar_spriteData[tSymbol] = tNewValue
  end repeat
  t_ar_tweenProperties = [#locH: 0, #locV: 0, #width: 0, #height: 0, #blend: 0, #rotation: 0, #skew: 0]
  t_ar_keyFrames = []
  t_frame = [#data: [:], #tween: t_ar_tweenProperties.duplicate()]
  tFirstKeyFrame = i_ar_spriteData.keyframes[1]
  tdata = m_ar_spriteData.duplicate()
  repeat with iParamCounter = 1 to tFirstKeyFrame.count
    tParamName = symbol(tFirstKeyFrame.getPropAt(iParamCounter))
    tParamValue = value(tFirstKeyFrame[iParamCounter])
    tdata[tParamName] = tParamValue
  end repeat
  t_frame.data = tdata
  t_ar_keyFrames.append(t_frame)
  repeat with i = 2 to i_ar_spriteData.keyframes.count
    tLastKeyFrame = t_ar_keyFrames[t_ar_keyFrames.count]
    tThisKeyFrame = i_ar_spriteData.keyframes[i]
    t_frame = [#data: [:], #tween: t_ar_tweenProperties.duplicate()]
    tdata = [:]
    repeat with iParamCounter = 1 to tThisKeyFrame.count
      tParamName = symbol(tThisKeyFrame.getPropAt(iParamCounter))
      tParamValue = value(tThisKeyFrame[iParamCounter])
      tdata[tParamName] = tParamValue
    end repeat
    t_frame.data = tdata
    t_bTweened = 0
    if tdata.findPos(#locH) > 0 then
      tLastKeyFrame.tween.locH = 1
      t_bTweened = 1
    end if
    if tdata.findPos(#locV) > 0 then
      tLastKeyFrame.tween.locV = 1
      t_bTweened = 1
    end if
    if tdata.findPos(#width) > 0 then
      tLastKeyFrame.tween.width = 1
      t_bTweened = 1
    end if
    if tdata.findPos(#height) > 0 then
      tLastKeyFrame.tween.height = 1
      t_bTweened = 1
    end if
    if tdata.findPos(#blend) > 0 or tdata.findPos(#blendLevel) > 0 then
      tLastKeyFrame.tween.blend = 1
      t_bTweened = 1
    end if
    if tdata.findPos(#rotation) then
      tLastKeyFrame.tween.rotation = 1
      t_bTweened = 1
    end if
    if tdata.findPos(#skew) then
      tLastKeyFrame.tween.skew = 1
      t_bTweened = 1
    end if
    if t_bTweened then
      tLastKeyFrame.data[#tweened] = 1
    end if
    tLastKeyFrame.data[#steps] = tdata.frame - tLastKeyFrame.data.frame
    t_ar_keyFrames.append(t_frame)
  end repeat
  if t_ar_keyFrames.count = 1 then
    keyFrameIndex = 1
    tThisKeyFrame = t_ar_spriteDefaults.duplicate()
    repeat with i = 1 to t_ar_keyFrames[keyFrameIndex].data.count
      tProp = t_ar_keyFrames[keyFrameIndex].data.getPropAt(i)
      tvalue = t_ar_keyFrames[keyFrameIndex].data[tProp]
      tThisKeyFrame[tProp] = tvalue
      t_ar_spriteDefaults[tProp] = tvalue
    end repeat
    m_ar_frames.append(tThisKeyFrame)
  else
    repeat with keyFrameIndex = 1 to t_ar_keyFrames.count - 1
      tThisKeyFrame = t_ar_spriteDefaults.duplicate()
      repeat with i = 1 to t_ar_keyFrames[keyFrameIndex].data.count
        tProp = t_ar_keyFrames[keyFrameIndex].data.getPropAt(i)
        tvalue = t_ar_keyFrames[keyFrameIndex].data[tProp]
        tThisKeyFrame[tProp] = tvalue
        t_ar_spriteDefaults[tProp] = tvalue
      end repeat
      tNextKeyFrame = t_ar_keyFrames[keyFrameIndex + 1]
      if keyFrameIndex = 1 then
        m_ar_frames.append(tThisKeyFrame)
      else
        m_ar_frames.append(t_ar_keyFrames[keyFrameIndex].data)
      end if
      tween = t_ar_keyFrames[keyFrameIndex].tween
      t_fSteps = t_ar_keyFrames[keyFrameIndex].data.steps * 1.0
      if tThisKeyFrame.tweened then
        if tween.locH then
          tDeltaLocH = (tNextKeyFrame.data.locH - tThisKeyFrame.locH) * 1.0
        end if
        if tween.locV then
          tDeltaLocV = (tNextKeyFrame.data.locV - tThisKeyFrame.locV) * 1.0
        end if
        if tween.width then
          tDeltaWidth = (tNextKeyFrame.data.width - tThisKeyFrame.width) * 1.0
        end if
        if tween.height then
          tDeltaHeight = (tNextKeyFrame.data.height - tThisKeyFrame.height) * 1.0
        end if
        if tween.blend then
          tDeltaBlend = (tNextKeyFrame.data.blend - tThisKeyFrame.blend) * 1.0
        end if
        if tween.rotation then
          tDeltaRotation = (tNextKeyFrame.data.rotation - tThisKeyFrame.rotation) * 1.0
        end if
        if tween.skew then
          tDeltaSkew = (tNextKeyFrame.data.skew - tThisKeyFrame.skew) * 1.0
        end if
        repeat with i = 1 to t_ar_keyFrames[keyFrameIndex].data.steps
          tdata = [:]
          tdata.sort()
          t = i / t_fSteps
          if tween.locH then
            if tDeltaLocH <> 0 then
              tdata[#locH] = tThisKeyFrame.locH + tDeltaLocH * t
            end if
          end if
          if tween.locV then
            if tDeltaLocV <> 0 then
              tdata[#locV] = tThisKeyFrame.locV + tDeltaLocV * t
            end if
          end if
          if tween.width then
            if tDeltaWidth <> 0 then
              tdata[#width] = tThisKeyFrame.width + tDeltaWidth * t
            end if
          end if
          if tween.height then
            if tDeltaHeight <> 0 then
              tdata[#height] = tThisKeyFrame.height + tDeltaHeight * t
            end if
          end if
          if tween.blend then
            if tDeltaBlend <> 0 then
              tdata[#blend] = tThisKeyFrame.blend + tDeltaBlend * t
            end if
          end if
          if tween.rotation then
            if tDeltaRotation <> 0 then
              tdata[#rotation] = tThisKeyFrame.rotation + tDeltaRotation * t
            end if
          end if
          if tween.skew then
            if tDeltaSkew <> 0 then
              tdata[#skew] = tThisKeyFrame.skew + tDeltaSkew * t
            end if
          end if
          m_ar_frames.append(tdata)
        end repeat
        next repeat
      end if
      repeat with i = 1 to t_ar_keyFrames[keyFrameIndex].data.steps
        tdata = [:]
        m_ar_frames.append(tdata)
      end repeat
    end repeat
  end if
  m_bInited = 1
end
on Activate me
  m_i_frameCounter = 0
  m_bActive = 1
end
on deactivate me
  m_i_frameCounter = 0
  m_bActive = 0
end
on getFrameData me
  if m_ar_frames.count <> 0 then
    m_i_frameCounter = min(m_i_frameCounter, m_ar_frames.count)
    return m_ar_frames[m_i_frameCounter]
  else
    return [:]
  end if
end
on insideFrameSpan me, i_frameIndex
  if i_frameIndex >= me.GetParam(#startFrame) and i_frameIndex <= me.GetParam(#endFrame) then
    return 1
  else
    return 0
  end if
end
on update me, i_iframeHead
  m_i_frameCounter = i_iframeHead - me.GetParam(#startFrame) + 1
end