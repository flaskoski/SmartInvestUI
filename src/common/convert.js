

//Dates
export function arraytoDate(d){
    return new Date(`${d[0]}-${d[1]}-${d[2]} 15:00`);
}

export function getFullDate(date){
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
}

export function getShortDate(date, sign = '-'){
    if(typeof date != "Date")
        date = new Date(date)
    return `${date.getFullYear()}${sign}${date.getMonth()+1<10? "0":""}${date.getMonth()+1}${sign}${date.getDate()+1<10? "0":""}${date.getDate()}`;
}
export function getUsaShortDate(date, sign = '-'){
    if(typeof date != "Date")
        date = new Date(date)
    return `${date.getMonth()+1<10? "0":""}${date.getMonth()+1}${sign}${date.getDate()+1<10? "0":""}${date.getDate()}${sign}${date.getFullYear()}`;
}

export function dateTimeInDays(dateTime, round = false){
    if(round)
        return Math.round( dateTime.getTime() / (1000 * 3600 * 24) )
    return dateTime.getTime() / (1000 * 3600 * 24)
}

//Objects

export function dateObjectToArray(object){
    return Object.keys(object).map(date => {
        let item = { "date": new Date(date) }
        Object.keys(object[date]).forEach(attr =>{
                item[attr] = (object[date][attr]-1) * 100
        })
        return item
    })
}