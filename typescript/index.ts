type Task = {
  id: number;
  title: string;
  isCompleted: boolean;
};

type Tasks = Task[];

const dataTasks: Tasks = [
  { id: 1, title: "Breakfast", isCompleted: false },
  { id: 2, title: "Work out", isCompleted: true },
  { id: 3, title: "Read a book", isCompleted: false },
];

function identify<T>(arg: T): T {
  return arg;
}

const firstPerson = identify<{ name: string; age: number }>({
  name: "Alice",
  age: 30,
});
const secondPerson = identify({ name: "Bob", age: 25 });

const numberArray = identify<number[]>([1, 2, 3, 4, 5]);
const stringArray = identify<string[]>(["a", "b", "c"]);
const booleanArray = identify<boolean[]>([true, false, true]);
const mixedArray = identify<(number | string)[]>([1, "two", 3, "four"]);
const objectArray = identify<{ id: number; value: string }[]>([
  { id: 1, value: "one" },
  { id: 2, value: "two" },
]);
const tupleArray = identify<
  [{ id: number; name: string }, { id: number; age: number }]
>([
  { id: 1, name: "Radit" },
  { id: 2, age: 28 },
]);

const mixedObjectArray = identify<
  { id: number; data: number | string | boolean | object }[]
>([
  { id: 1, data: 42 },
  { id: 2, data: "hello" },
  { id: 3, data: true },
  { id: 4, data: { key: "value" } },
]);

console.log(dataTasks);
console.log(firstPerson, secondPerson);
console.log(numberArray, stringArray, booleanArray, mixedArray);
console.log(objectArray, tupleArray, mixedObjectArray);
