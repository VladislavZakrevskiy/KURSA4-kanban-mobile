import { FC } from 'react'
import { Flex, FlexProps } from './Flex'

export const VStack: FC<FlexProps> = (props) => <Flex direction="column" {...props} />
