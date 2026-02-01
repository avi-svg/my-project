const db = require("../config/postgres");

const Session = {
    create: async ({
        user_id,
        refresh_token_hash,
        expires_at,
        user_agent
    }) => {
        const query = `
      INSERT INTO sessions
      (user_id, refresh_token_hash, expires_at, user_agent)
      VALUES ($1, $2, $3, $4)
      RETURNING id
    `;

        const values = [
            user_id,
            refresh_token_hash,
            expires_at,
            user_agent
        ];

        const { rows } = await db.query(query, values);
        return rows[0];
    },

    findByRefreshToken: async (hashedToken) => {
        const query = `
      SELECT *
      FROM sessions
      WHERE refresh_token_hash = $1
        AND is_revoked = false
      LIMIT 1
    `;

        const { rows } = await db.query(query, [hashedToken]);
        return rows[0];
    },

    rotateToken: async (sessionId, newHashedToken) => {
        const query = `
      UPDATE sessions
      SET refresh_token_hash = $1,
          rotated_at = NOW()
      WHERE id = $2
    `;

        await db.query(query, [newHashedToken, sessionId]);
    },

    revokeById: async (sessionId) => {
        const query = `
      UPDATE sessions
      SET is_revoked = true
      WHERE id = $1
    `;

        await db.query(query, [sessionId]);
    },

    revokeAllForUser: async (userId) => {
        const query = `
      UPDATE sessions
      SET is_revoked = true
      WHERE user_id = $1
    `;

        await db.query(query, [userId]);
    },
    revokeByRefreshToken: async (hashedToken) => {
        const query = `
    UPDATE sessions
    SET is_revoked = true
    WHERE refresh_token_hash = $1
  `;

        await db.query(query, [hashedToken]);
    }


};

module.exports = Session;
