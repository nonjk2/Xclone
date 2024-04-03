import { setTimeout } from "timers/promises";

const Page = async () => {
  await setTimeout(1000);
  return <div>asd</div>;
};

export default Page;
