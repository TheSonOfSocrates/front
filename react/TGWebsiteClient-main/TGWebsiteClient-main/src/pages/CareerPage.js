import { Helmet } from 'react-helmet-async';
import CareerPanel from '../sections/career/CareerPanel';

export default function AboutPage() {

  return (
    <>
      <Helmet>
        <title>Career | Frontend Developer</title>
      </Helmet>

      <CareerPanel />

    </>
  );
}
