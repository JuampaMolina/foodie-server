import { test } from "node:test";
import assert from "node:assert/strict";
import paginate from "./paginate.js";

const fakeQuery = (result) => ({
  calls: [],
  skip(value) {
    this.calls.push(["skip", value]);
    return this;
  },
  limit(value) {
    this.calls.push(["limit", value]);
    return this;
  },
  then(resolve) {
    resolve(result);
  },
});

test("sin page ni limit, devuelve la query tal cual", async () => {
  const query = fakeQuery(["a", "b"]);
  const model = { countDocuments: async () => 2 };

  const result = await paginate(model, query, {});

  assert.deepEqual(result, ["a", "b"]);
});

test("con page y limit, pagina y devuelve el envoltorio con metadata", async () => {
  const query = fakeQuery(["a", "b"]);
  const model = { countDocuments: async () => 23 };

  const result = await paginate(model, query, { page: 2, limit: 10 });

  assert.deepEqual(query.calls, [
    ["skip", 10],
    ["limit", 10],
  ]);
  assert.deepEqual(result, {
    items: ["a", "b"],
    page: 2,
    limit: 10,
    total: 23,
    totalPages: 3,
  });
});

test("con solo limit, usa page 1 por defecto", async () => {
  const query = fakeQuery([]);
  const model = { countDocuments: async () => 0 };

  const result = await paginate(model, query, { limit: 5 });

  assert.deepEqual(query.calls, [
    ["skip", 0],
    ["limit", 5],
  ]);
  assert.equal(result.page, 1);
  assert.equal(result.totalPages, 0);
});
