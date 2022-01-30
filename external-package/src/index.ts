let worker: Worker;
export const getWorker = function (): Worker {
  if (!worker) {
    worker = new Worker(new URL('./worker.ts', import.meta.url));
  }
  return worker;
};

