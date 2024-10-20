import AsyncStorage from '@react-native-async-storage/async-storage'

export class AsyncStorageService {
    static async setItem<T>(key: string, value: T): Promise<void> {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem(key, jsonValue)
        } catch (error) {
            console.error('Ошибка при сохранении данных:', error)
        }
    }

    static async getItem<T = string>(key: string): Promise<T | null> {
        try {
            const jsonValue = await AsyncStorage.getItem(key)
            return jsonValue != null ? (JSON.parse(jsonValue) as T) : null
        } catch (error) {
            console.error('Ошибка при получении данных:', error)
            return null
        }
    }

    static async updateItem<T>(key: string, newValue: Partial<T>): Promise<void> {
        try {
            const currentData = await this.getItem<T>(key)
            const updatedData = { ...currentData, ...newValue }
            await this.setItem(key, updatedData)
        } catch (error) {
            console.error('Ошибка при обновлении данных:', error)
        }
    }

    static async removeItem(key: string): Promise<void> {
        try {
            await AsyncStorage.removeItem(key)
        } catch (error) {
            console.error('Ошибка при удалении данных:', error)
        }
    }

    static async clearStorage(): Promise<void> {
        try {
            await AsyncStorage.clear()
        } catch (error) {
            console.error('Ошибка при очистке хранилища:', error)
        }
    }

    static async addToArray<T>(key: string, newItem: T): Promise<void> {
        try {
            const currentArray = (await this.getItem<T[]>(key)) || []
            const updatedArray = [...currentArray, newItem]
            await this.setItem(key, updatedArray)
        } catch (error) {
            console.error('Ошибка при добавлении элемента в массив:', error)
        }
    }

    static async removeFromArray<T>(key: string, itemToRemove: T): Promise<void> {
        try {
            const currentArray = (await this.getItem<T[]>(key)) || []
            const updatedArray = currentArray.filter((item) => item !== itemToRemove)
            await this.setItem(key, updatedArray)
        } catch (error) {
            console.error('Ошибка при удалении элемента из массива:', error)
        }
    }
}
