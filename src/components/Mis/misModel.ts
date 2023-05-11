import connection from "../../helpers/db";


const Users = function (options) {
    this.firstName = options.firstName;
    this.lastName = options.lastName;
    this.email = options.email;
    this.type = options.type;
    this.createdAt = new Date();
    this.updatedAt = new Date();
};

Users.create = function (user, result) {
    connection.query("INSERT INTO users set ?", user, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res.insertId);
        }
    });
};

Users.read = function (offset, limit, type, result) {
    console.log(type)
    let query = `SELECT * FROM users LIMIT ${offset}, ${limit}`;
    if (type) {
        query = `SELECT * FROM users WHERE type='${type}' LIMIT ${offset}, ${limit}`
    }

    console.log(query);

    connection.query(query, (err, res) => {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Users.update = function (id, user, result) {
    connection.query("UPDATE users SET ? WHERE _id = ?", [user, id], function (
        err,
        res
    ) {
        if (err) {
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

Users.delete = function (id, result) {
    connection.query("DELETE FROM users WHERE _id = ?", [id], function (
        err,
        res
    ) {
        if (err) {
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

export default Users;
