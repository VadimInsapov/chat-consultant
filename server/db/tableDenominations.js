module.exports = {
    USER: {
        tableName: "user",
        columns: {
            ID: "id",
            NAME: "name",
            LAST_NAME: "last_name",
        }
    },
    EMPLOYEE: {
        tableName: "employee",
        columns: {
            ID: "id",
            EMAIL: "email",
            PASSWORD: "password",
            USER_ID: "user_id",
        }
    },
    CHANNEL: {
        tableName: "channel",
        columns: {
            ID: "id",
            DOMAIN: "domain",
        }
    },
    EMPLOYEE_CHANNEL: {
        tableName: "employee_channel",
        columns: {
            EMPLOYEE_ID: "employee_id",
            CHANNEL_ID: "chanel_id",
        }
    },
}