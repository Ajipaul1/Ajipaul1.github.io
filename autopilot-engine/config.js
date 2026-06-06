const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, 'db.json');

function readDb() {
  try {
    if (!fs.existsSync(DB_PATH)) {
      return { prospects: [], outreach_logs: [], social_posts: [] };
    }
    const raw = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to read db.json:", e);
    return { prospects: [], outreach_logs: [], social_posts: [] };
  }
}

function writeDb(data) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (e) {
    console.error("Failed to write to db.json:", e);
    return false;
  }
}

module.exports = {
  readDb,
  writeDb
};
