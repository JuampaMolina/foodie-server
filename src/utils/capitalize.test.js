import { test } from "node:test";
import assert from "node:assert/strict";
import capitalize from "./capitalize.js";

test("capitaliza la primera letra de cada palabra", () => {
  assert.equal(capitalize("hamburguesa clásica"), "Hamburguesa Clásica");
});

test("no toca palabras ya capitalizadas", () => {
  assert.equal(capitalize("Pizza Margarita"), "Pizza Margarita");
});

test("devuelve undefined para valores vacíos", () => {
  assert.equal(capitalize(""), undefined);
  assert.equal(capitalize(undefined), undefined);
});
