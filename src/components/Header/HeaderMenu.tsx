import React, { FC, useState } from 'react'
import { useAppSelector } from '@/src/lib/hooks/useAppSelector'
import { VStack } from '../ui/Stack/VStack'
import { Text } from '../ui/Text/Text'
import { ActivityIndicator, Pressable, TouchableOpacity } from 'react-native'
import { ThemeSwitcher } from '../switchers/ThemeSwitcher/ThemeSwitcher'
import { Card } from '../ui/Card/Card'
import { Theme } from '@/src/stores/themeStore/themes/Theme'
import { BoardIcon } from '../icons/BoardIcon'
import { Board } from '@/src/types/Board'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { EditBoardModal } from '../Board/Board/EditBoardModal'
import { Entypo } from '@expo/vector-icons'
import { HStack } from '../ui/Stack/HStack'
import { AddBoardModal } from '../Board/Board/AddBoardModal'

interface HeaderMenuProps {
    isOpen: boolean
    boards: Board[]
    isLoading: boolean
    refetch: Function
    onClick: (board: Board) => void
}

const MenuItem = ({
    id,
    title,
    theme,
    onPress,
    refetch,
}: {
    refetch: Function
    id: string
    title: string
    theme: Theme
    onPress: () => void
}) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <Pressable
                onPress={onPress}
                style={({ pressed }) => [
                    {
                        backgroundColor: pressed
                            ? theme.background.button.primary.default
                            : theme.background.paper.secondary,
                        borderTopRightRadius: 100,
                        borderBottomRightRadius: 100,
                        paddingVertical: 12,
                        paddingLeft: 20,
                        paddingRight: 24,
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        gap: 12,
                    },
                ]}
            >
                {({ pressed }) => (
                    <HStack justify="space-between" align="center" style={{ width: '100%' }}>
                        <HStack justify="space-between" align="center" gap={10}>
                            <BoardIcon fill={pressed ? theme.text.light : undefined} />
                            <Text style={{ maxWidth: '90%' }} color={pressed ? theme.text.light : undefined}>
                                {title}
                            </Text>
                        </HStack>

                        {title !== '+ Create new board' && (
                            <TouchableOpacity onPress={() => setIsOpen(true)}>
                                <Entypo name="dots-three-vertical" size={24} color={theme.text.caption} />
                            </TouchableOpacity>
                        )}
                    </HStack>
                )}
            </Pressable>
            <EditBoardModal refetch={refetch} boardId={id} isOpen={isOpen} setIsOpen={() => setIsOpen(false)} />
        </>
    )
}

export const HeaderMenu: FC<HeaderMenuProps> = ({ isOpen, boards, isLoading, onClick, refetch }) => {
    const { theme } = useAppSelector((state) => state.theme)
    const { top } = useSafeAreaInsets()
    const [isBoardOpen, setIsBoardOpen] = useState(false)

    return (
        <>
            <Card
                style={{
                    position: 'absolute',
                    display: isOpen ? 'flex' : 'none',
                    top: 76 + top,
                    borderBottomLeftRadius: 12,
                    borderBottomRightRadius: 12,
                    width: '80%',
                }}
            >
                <VStack gap={16} align="center">
                    <VStack
                        style={{
                            paddingRight: 16,
                        }}
                        max
                    >
                        <Text variant="caption" style={{ paddingHorizontal: 12, paddingVertical: 12 }}>
                            All boards ({boards?.length})
                        </Text>
                        {isLoading ? (
                            <ActivityIndicator size={'large'} color={theme.background.button.primary.default} />
                        ) : (
                            boards?.map((board) => (
                                <MenuItem
                                    refetch={refetch}
                                    id={board.id}
                                    theme={theme}
                                    title={board.title}
                                    key={board.id}
                                    onPress={() => onClick(board)}
                                />
                            ))
                        )}
                        <MenuItem
                            refetch={() => {}}
                            id="Create"
                            theme={theme}
                            title={'+ Create new board'}
                            key={'Create new board'}
                            onPress={() => setIsBoardOpen(true)}
                        />
                    </VStack>

                    <Card style={{ paddingHorizontal: 57, paddingVertical: 14, margin: 16 }}>
                        <ThemeSwitcher />
                    </Card>
                </VStack>
            </Card>
            <AddBoardModal refetch={refetch} isOpen={isBoardOpen} setIsOpen={setIsBoardOpen} />
        </>
    )
}
