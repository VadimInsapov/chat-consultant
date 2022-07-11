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
}