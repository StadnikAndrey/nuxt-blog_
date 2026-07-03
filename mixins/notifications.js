import { mapActions } from "vuex";
export default {
    methods: {
        ...mapActions({ notificationsAdd: "notifications/notificationsAdd" }),
    }
}