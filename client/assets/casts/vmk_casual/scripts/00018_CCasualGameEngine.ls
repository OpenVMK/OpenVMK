-- Behavior
on construct this
  return 1
end
on deconstruct this
  return 1
end
on AddPlayer this, a_iAvatarRef, a_rMsg
  put "CCasualGameEngine::AddPlayer"
end
on RemovePlayer this, a_iAvatarRef, a_rMsg
  put "CCasualGameEngine::RemovePlayer"
end
on GameStart this, a_rMsg
  put "CCasualGameEngine::GameStart"
end
on GameEnd this, a_iWinnerRef, a_rMsg
  put "CCasualGameEngine::GameEnd"
end
on GameEvent this, a_iEventType, a_rMsg
  put "CCasualGameEngine::GameEvent"
end
on NextTurn this, a_iAvatarRef, a_rMsg
  put "CCasualGameEngine::NextTurn"
end