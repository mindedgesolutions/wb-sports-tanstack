import { useParams } from 'react-router-dom';

const SpaStadiumForm = () => {
  const { id } = useParams();
  console.log(id);

  return <div>SpaStadiumForm</div>;
};
export default SpaStadiumForm;
