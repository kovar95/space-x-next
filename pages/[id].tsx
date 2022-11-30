import { GetServerSideProps } from "next";
import Preview from "../components/Preview";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id;
  return {
    props: {
      id: id,
    },
  };
};

type Props = {
  id: string;
};

const Overview: React.FC<Props> = ({ id }) => {
  return <Preview id={id} />;
};

export default Overview;
