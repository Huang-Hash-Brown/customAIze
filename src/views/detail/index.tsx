import { useParams } from 'react-router-dom';

export const Detail = () => {
  const { id } = useParams();

  return <div>Current id: {id}</div>;
};

export default Detail;
