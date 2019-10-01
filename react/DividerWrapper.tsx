import React from 'react'
import { Divider } from 'vtex.styleguide'

interface Props {
  orientation: 'vertical' | 'horizontal'
}

const DividerWrapper: StorefrontFunctionComponent<Props> = ({
  orientation,
}) => <Divider orientation={orientation} />

DividerWrapper.defaultProps = {
  orientation: 'vertical',
}

DividerWrapper.schema = {
  properties: {
    orientation: {
      type: 'string',
      default: DividerWrapper.defaultProps,
      isLayout: true,
    },
  },
}

export default DividerWrapper
