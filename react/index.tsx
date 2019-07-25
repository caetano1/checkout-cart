import React from 'react'

const Example: StorefrontFunctionComponent<ExampleProps> = () => {

  return (
    <div>Hello World</div>
  )
}

interface ExampleProps {
  title?: string
}

export default Example
