import { Box } from './components/Box';
import { Dustbin } from './components/Dustbin';

export const SimplDnD = () => {
  return (
    <div>
      <div>
        <Dustbin />
      </div>
      <div className="box-container">
        <Box name="Glass" />
        <Box name="Banana" />
        <Box name="Paper" />
      </div>
    </div>
  );
};
