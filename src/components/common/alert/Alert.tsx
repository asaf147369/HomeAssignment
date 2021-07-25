import { useEffect, useState } from 'react';
import Alert from '@material-ui/core/Alert';


export default function SimpleAlerts({ error }:{error:string}) {

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timeout1: NodeJS.Timeout;
    const timeout = (fn:Function) =>
      timeout1 = setTimeout(() => {
        fn();
      }, 2500);

    if (error) {
      setVisible(true);

      timeout(() => {
        setVisible(false);
      });
    } else {
      return setVisible(false);
    }

    return () => {
      clearTimeout(timeout1);
    };
  }, [error]);

  return (
    <div style={{
      opacity: visible ? '1' : '0',
      transition: '0.3s ease',
      transform: visible ? 'translateY(0)' : 'translateY(100px)',
      display: visible ? "block" : "none"
    }}>
      <Alert severity="error" {...error}>
        {error}
      </Alert>
    </div>
  );
}