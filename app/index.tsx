import { Paper, Text } from '@/src/components'
import { AuthProvider } from '@/src/components/providers/AuthProvider/AuthProvider'
import { useAppSelector } from '@/src/lib/hooks/useAppSelector'
import { useRouter } from 'expo-router'
import { useEffect } from 'react'

export default function Index() {
    const router = useRouter()
    const { boards } = useAppSelector((state) => state.allBoards)
    const { currentBoard } = useAppSelector((state) => state.board)

    useEffect(() => {
        if (currentBoard) {
            router.push(`/${currentBoard.id}`)
        }
    }, [currentBoard])

    if (!currentBoard && boards.length !== 0) {
        return (
            <AuthProvider>
                <Paper
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 20,
                    }}
                >
                    <Text style={{ textAlign: 'center' }} variant="caption">
                        You have boards, but you haven't chosen more than one - choose!
                    </Text>
                </Paper>
            </AuthProvider>
        )
    }

    if (!currentBoard && boards.length === 0) {
        return (
            <AuthProvider>
                <Paper
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 20,
                    }}
                >
                    <Text style={{ textAlign: 'center' }} variant="caption">
                        You have no boards, create board!
                    </Text>
                </Paper>
            </AuthProvider>
        )
    }

    return (
        <AuthProvider>
            <Paper
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Text>Необработанный случай!!!</Text>
            </Paper>
        </AuthProvider>
    )
}
