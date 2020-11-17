export function createRandomId(): string {
  const id = Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, "")
    .substr(0, 5);
  return id;
}

export function createRandomName(): string {
  return "Player#" + Math.random().toString().substr(2, 6);
}

export function log(txt: any) {
  if (process.env.NODE_ENV !== "test") return;

  console.log("-".repeat(35));
  console.log(txt);
  console.log("-".repeat(35));
  console.log();
}
