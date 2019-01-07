import React from 'react';

import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DoneIcon from '@material-ui/icons/Done';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import BlankIcon from '@material-ui/icons/List';
import ErrorIcon from '@material-ui/icons/Warning';

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
    // Notify changes to the API
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
      <ExpansionPanel className='unit-box' onChange={this.handlePanelEvent}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant='h6' noWrap={true}>
            {(unitStatus === 2 && <DoneAllIcon nativeColor='green' fontSize='inherit' className='state-icon' />) ||
              (unitStatus === 1 && <DoneIcon nativeColor='orange' fontSize='inherit' className='state-icon' />) ||
              (unitStatus === 3 && <ErrorIcon nativeColor='red' fontSize='inherit' className='state-icon' />) ||
              <BlankIcon color='disabled' fontSize='inherit' className='state-icon' />} {id} {descripcio && descripcio.trim() && `(${descripcio.trim()})`}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
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
              control={<Switch
                checked={chk !== '0'}
                onChange={this.handleChange(i)}
              />}
            />)}
          </div>}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

export default Unit;
