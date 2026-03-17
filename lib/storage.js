import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "cards.json");

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
  }
}

export function getAllCards() {
  ensureDataFile();
  const raw = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(raw);
}

export function getCard(id) {
  const cards = getAllCards();
  return cards.find((c) => c.id === id) || null;
}

export function saveCard(card) {
  const cards = getAllCards();
  cards.push(card);
  fs.writeFileSync(DATA_FILE, JSON.stringify(cards, null, 2));
  return card;
}
