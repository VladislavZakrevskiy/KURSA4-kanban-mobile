import { FC } from 'react'
import { Flex, FlexProps } from './Flex'

export const HStack: FC<FlexProps> = (props) => <Flex direction="row" {...props} />
