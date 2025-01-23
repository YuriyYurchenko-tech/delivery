import { Button } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import { ClockLoader } from "react-spinners";
//      

export default function SpinnerUi() {
  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    }}>

<ClockLoader />
      {/* <Button variant="primary" disabled>
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        <span className="visually-hidden">Loading...</span>
      </Button> */}
    </div>
  );
}
