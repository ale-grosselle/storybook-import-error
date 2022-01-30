import {getWorker} from "./index";

export default {
  title: 'libs/worker',
};

export const Example = () => {
  getWorker();
  return "HELLO!"
}
