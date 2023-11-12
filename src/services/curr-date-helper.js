const currDate = new Date()

const year = currDate.getFullYear()
const month = String(currDate.getMonth() + 1).padStart(2, '0')
const day = String(currDate.getDate()).padStart(2, '0')

const formattedDate = `${year}-${month}-${day}`


export default {
    currentDate() {
        return formattedDate
    }
}