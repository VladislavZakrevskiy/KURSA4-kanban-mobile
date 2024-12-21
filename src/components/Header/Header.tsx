import { Pressable, TouchableOpacity } from 'react-native'
import { Text } from '../ui/Text/Text'
import { HStack } from '../ui/Stack/HStack'
import { Logo } from '../icons/Logo'
import { ArrowDown } from '../icons/ArrowDown'
import { Button } from '../ui/Button/Button'
import { FontAwesome5, Ionicons } from '@expo/vector-icons'
import { useGetUserBoardsDetailsQuery } from '@/src/stores'
import { Fragment, useEffect, useState } from 'react'
import { useAppSelector } from '@/src/lib/hooks/useAppSelector'
import { useRouter } from 'expo-router'
import { HeaderMenu } from './HeaderMenu'
import { Paper } from '../ui/Paper/Paper'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useAllBoardsActions } from '@/src/stores/boardsStore/allBoardsStore'
import { AddColumnModal } from '../Board/Column/AddColumnModal'

export const Header = () => {
    const { top } = useSafeAreaInsets()
    const { isLoading, data, refetch } = useGetUserBoardsDetailsQuery()
    const { setAllBoards } = useAllBoardsActions()
    const { theme } = useAppSelector((state) => state.theme)
    const { currentBoard } = useAppSelector((state) => state.board)
    const [isOpen, setIsOpen] = useState(false)
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const router = useRouter()

    useEffect(() => {
        if (data) {
            setAllBoards(data)
        }
    }, [data])

    return (
        <Fragment>
            <Paper variant="secondary" style={{ paddingBottom: 20, paddingTop: 20 + top, paddingHorizontal: 16 }}>
                <HStack justify="space-between">
                    <HStack gap={16} align="center">
                        <Logo />
                        <HStack gap={8} align="center">
                            <Pressable onPress={() => setIsOpen((prev) => !prev)}>
                                <Text bold>Platform Launch</Text>
                            </Pressable>
                            <ArrowDown />
                        </HStack>
                    </HStack>

                    <HStack gap={16} align="center">
                        <Button disabled={!currentBoard} size="l" onPress={() => setIsAddModalOpen(true)}>
                            <FontAwesome5 name="plus" size={16} color="white" />
                        </Button>
                        <TouchableOpacity onPress={() => router.push('/settings')}>
                            <Ionicons name="settings" size={24} color={theme.text.caption} />
                        </TouchableOpacity>
                    </HStack>
                </HStack>

                <HeaderMenu
                    refetch={refetch}
                    boards={data ? data : []}
                    isLoading={isLoading}
                    isOpen={isOpen}
                    onClick={(board) => {
                        setIsOpen(false)
                        router.push(`/${board.id}`)
                    }}
                />
            </Paper>
            <AddColumnModal isOpen={isAddModalOpen} setIsOpen={setIsAddModalOpen} />
        </Fragment>
    )
}
