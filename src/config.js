const config = {
    APP_ENV: process.env.APP_ENV,
    APP_URL: process.env.APP_URL,
    
    DB: {
        HOST: process.env.DB_HOST,
        USER: process.env.DB_USER,
        NAME: process.env.DB_NAME,
        PASS: process.env.DB_PASSWORD,
        DIALECT: process.env.DB_DIALECT,
    },

    JWT: {
        SECRET: process.env.JWT_SECRET_KEY,
        EXPIRES: process.env.JWT_EXPIRE_TIME,
        ALGORITHM: process.env.JWT_HASH_ALGO,
    },
};

module.exports = config;
