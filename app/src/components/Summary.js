import React from 'react';

import Grid from '@material-ui/core/Grid';
import GraphBar from './GraphBar';
import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import Divider from '@material-ui/core/Divider';

/**
 * This component shows a graphic and numeric resume of the global
 * state of all checks, grouped by products and units.
 */
class Summary extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      summary: this.props.order.summary,
      expanded: true,
    };
  }

  updateData(summary) {
    this.setState({ summary });
  }

  handlePanelEvent = (_ev, exp) => {
    this.setState({ expanded: exp });
  }

  handleBtnPrint = () => {
    const d = new Date();
    this.props.order.csvExportToFile(`${this.props.order.id}#${d.toLocaleString().replace(/(?:\/|:|, )/g, '-')}.csv`);
  }

  render() {
    const { summary: { products, units, checks }, expanded } = this.state;

    const labels = [
      'No comprovats',
      'Parcialment comprovats',
      'Comprovats',
      'Amb errors'
    ];
    const colors = [
      'lightgray',
      'yellow',
      'green',
      'red'
    ]
    const barWidth = '100%';
    const barHeight = '1rem';

    return (
      <Accordion className='summary-box' id='ResumBOX' onChange={this.handlePanelEvent} expanded={expanded}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant='h5' noWrap>Resum</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {expanded && <Grid container spacing={1}>
            <Grid item xs={8} xm={6}>Productes totalment comprovats: {products.done}&nbsp;/&nbsp;{products.num}</Grid>
            <Grid item xs={4} xm={6}>
              <GraphBar
                values={products.state}
                labels={labels}
                colors={colors}
                width={barWidth}
                height={barHeight}
              />
            </Grid>
            <Grid item xs={8} xm={6}>Unitats totalment comprovades: {units.done}&nbsp;/&nbsp;{units.num}</Grid>
            <Grid item xs={4} xm={6}>
              <GraphBar
                values={units.state}
                labels={labels}
                colors={colors}
                width={barWidth}
                height={barHeight}
              />
            </Grid>
            <Grid item xs={8} xm={6}>Comprovacions superades: {checks.done}&nbsp;/&nbsp;{checks.num}</Grid>
            <Grid item xs={4} xm={6}>
              <GraphBar
                values={[checks.num - checks.done, checks.done]}
                labels={[labels[0], labels[2]]}
                colors={[colors[0], colors[2]]}
                width={barWidth}
                height={barHeight}
              />
            </Grid>
            <Grid item xs={12} className='summary-buttons'>
              <Divider />
              <Button
                className='print-btn'
                onClick={this.handleBtnPrint}
                variant='contained'
                color='primary'>
                <SaveIcon />
                Exporta a CSV
              </Button>
            </Grid>
          </Grid>}
        </AccordionDetails>
      </Accordion>
    );
  }
}

export default Summary;