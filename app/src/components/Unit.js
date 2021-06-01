import React from 'react';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DoneIcon from '@material-ui/icons/Done';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import BlankIcon from '@material-ui/icons/List';
import ErrorIcon from '@material-ui/icons/Warning';


/**
 * This component contains controls used to display and change the status of a specific unit:
 */
class Unit extends React.Component {

  state = { expanded: false };

  static DEFAULT_CHECK = 'Producte lliurat correctament';

  getCheckText = num => {
    const { checks } = this.props.item;
    return checks && checks.length > num ? checks[num] : Unit.DEFAULT_CHECK;
  };

  handleChange = id => ev => {
    const { unit, updateUnit } = this.props;
    if (typeof id === 'number')
      unit.setCheckValue(id, ev.target.checked);
    else
      unit.setAttribute(id, ev.target.value);
    this.setState({ expanded: this.state.expanded });
    // Notify changes to main app
    updateUnit(unit);
  }

  handlePanelEvent = (_ev, exp) => {
    this.setState({ expanded: exp });
  }

  updateContent() {
    this.setState({expanded: this.state.expanded});
  }

  render() {
    const { item, unit: { num, id, descripcio, problemes, checks, unitStatus }, unit } = this.props;
    const { expanded } = this.state;
    return (
      <Accordion className='unit-box' onChange={this.handlePanelEvent}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant='h6' noWrap={true}>
            {(unitStatus === 2 && <DoneAllIcon  className="state-icon, color-green" fontSize="inherit" />) ||
              (unitStatus === 1 && <DoneIcon className="state-icon, color-orange" fontSize="inherit" />) ||
              (unitStatus === 3 && <ErrorIcon className="state-icon, color-red" fontSize="inherit" />) ||
              <BlankIcon color='disabled' fontSize='inherit' className='state-icon' />} {id} {descripcio && descripcio.trim() && `(${descripcio.trim()})`}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {expanded && <div className='unit-details'>
            <TextField
              id='id'
              label='Identificador (SACE)'
              value={id || ''}
              placeholder={`Unitat ${num}`}
              onChange={this.handleChange('id')}
              margin='normal'
            />
            <TextField
              id='descripcio'
              label='Descripció / Ubicació'
              value={descripcio || ''}
              onChange={this.handleChange('descripcio')}
              margin='normal'
            />
            <TextField
              id='problemes'
              className=''
              label='Problemes detectats'
              value={problemes || ''}
              onChange={this.handleChange('problemes')}
              margin='normal'
              error={unit.hasProblems()}
            />
            <Typography variant='h6' noWrap gutterBottom>Comprovacions:</Typography>
            {checks.split('').map((chk, i) => <FormControlLabel            
              key={`${item.id}.${num}.${i}`}
              label={this.getCheckText(i)}
              className="check-item"
              control={<Switch
                checked={chk !== '0'}
                onChange={this.handleChange(i)}
              />}
            />)}
          </div>}
        </AccordionDetails>
      </Accordion>
    );
  }
}

export default Unit;
