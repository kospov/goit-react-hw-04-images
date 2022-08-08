import { Watch } from 'react-loader-spinner';
import s from '../Loader/Loader.module.css';

const Loader = () => {
  return (
    <div className={s.container}>
      <Watch className={s.loader} />
    </div>
  );
};

export default Loader;
