import { proxy } from "valtio";

const state = proxy({
  currentPage: "/",
});

export default state;
