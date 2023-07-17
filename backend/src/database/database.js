import Sequelize from "sequelize";

export const sequelize = new Sequelize(
    //esto esta por docker
    // process.env.DATABASE_URL || "postgres://clinishare:password@localhost/clinisharedb"
    process.env.DATABASE_URL || "postgres://clinishare:password@localhost:5432/clinisharedb"
);
