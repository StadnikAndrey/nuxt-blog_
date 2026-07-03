import { parseDate } from "@/utils/library.js";
export default {
    methods: {
        createViewDateArticle(d = new Date()) {
            let date = parseDate(new Date(d));
            let month = date.monthTxt;
            month = month.toLowerCase();
            let res = `${date.date} ${month} ${date.year}`;
            return res;
        },
    },
}