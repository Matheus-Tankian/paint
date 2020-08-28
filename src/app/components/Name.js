import React, { useState } from 'react'

export default React.memo(() => {
  const [name, setName] = useState('')
  return (
    <label className="header-name">
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        onClick={e => e.target.setSelectionRange(0, e.target.value.length)}
        placeholder="Untitled"
      />
    </label>
  )
})