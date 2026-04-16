const pool = {
    query: async () => { throw new Error("Pas encore dans Docker"); }
};

const redis = {
    ping: async () => { throw new Error("Pas encore dans Docker"); }
};

module.exports = { pool, redis };
