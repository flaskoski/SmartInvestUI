


export function arraytoDate(d){
    return new Date(`${d[0]}-${d[1]}-${d[2]} 15:00`);
}

export function getFullDate(date){
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
}

export function dateTimeInDays(dateTime, round = false){
    if(round)
        return Math.round( dateTime.getTime() / (1000 * 3600 * 24) )
    return dateTime.getTime() / (1000 * 3600 * 24)
}