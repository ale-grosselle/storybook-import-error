import { getWorker } from "external-package";

export default {
  title: 'libs/worker',
};

export const play = function () {
  console.log("What is?", getWorker());
};

