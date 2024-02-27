const page = ({
  params,
}: {
  params: {
    messageId: number;
  };
}) => {
  return <div>{params.messageId}</div>;
};
export default page;
