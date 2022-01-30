import { getWorker } from "external-package";

export const play = function () {
  console.log("What is?", getWorker());
};

