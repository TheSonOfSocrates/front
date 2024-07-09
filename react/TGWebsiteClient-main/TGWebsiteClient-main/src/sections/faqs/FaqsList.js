// @mui
import { Accordion, Typography, AccordionSummary, AccordionDetails } from '@mui/material';
// components
import Iconify from '../../components/iconify';

// ----------------------------------------------------------------------

const _faqs = [
  {
    id: 1,
    value: `1`,
    heading: `What are ours main products`,
    detail: 'Our main product is smart trading bot with unique trading strategies',
  },
  {
    id: 2,
    value: `2`,
    heading: `Do we provide another services?`,
    detail:
      'Yes, we provide various services related to crypto world such as blockchain development, cryptocurrency consulting...',
  },
];
export default function FaqsList() {
  return (
    <div>
      {_faqs.map((accordion) => (
        <Accordion key={accordion.id}>
          <AccordionSummary expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}>
            <Typography variant="subtitle1">{accordion.heading}</Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Typography>{accordion.detail}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
