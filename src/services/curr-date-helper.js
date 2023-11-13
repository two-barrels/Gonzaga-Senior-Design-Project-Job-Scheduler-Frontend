export default {
    currentDate() {
        const currDate = new Date()
        return `${currDate.getFullYear()}-${String(currDate.getMonth() + 1).padStart(2, '0')}-${String(currDate.getDate()).padStart(2, '0')}`
    }
}