function parseDate(dateString = "2023-04-07 16:41:21") {
    let res = {
        date: null,
        monthTxt: null,
        monthNum: null,
        year: null,
    };
    let month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let date = new Date(dateString);
    res.date = date.getDate();
    res.monthTxt = month[date.getMonth()];
    res.monthNum = date.getMonth();
    res.year = date.getFullYear();
    return res;
}

export { parseDate }