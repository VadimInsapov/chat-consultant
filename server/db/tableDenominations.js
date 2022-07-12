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
            CHANNEL_ID: "channel_id",
            ROLE: {
                columnName: "role",
                values: {
                    ADMIN: "ADMIN",
                    MODERATOR: "MODERATOR",
                }
            },
        }
    },
    CHAT: {
        tableName: "chat",
        columns: {
            ID: "id",
            CHANNEL_ID: "channel_id",
            EMPLOYEE_ID: "employee_id",
        }
    },
    QUEST: {
        tableName: "quest",
        columns: {
            ID: "id",
            USER_ID: "user_id",
            CHAT_ID: "chat_id",
            CITY: "city",
        }
    },
    MESSAGE: {
        tableName: "message",
        columns: {
            USER_ID: "user_id",
            CHAT_ID: "chat_id",
            BODY: "body",
            CREATED_AT: "created_at",
            UPDATED_AT: "updated_at"
        }
    },
    EMPLOYEE_CHAT: {
        tableName: "employee_chat",
        columns: {
            EMPLOYEE_ID: "employee_id",
            CHAT_ID: "chat_id",
        }
    },
}