import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

class ErrorPage extends React.Component {

  handleBtnClick = ev => {
    document.location.href = '.';
  }

  render() {
    const { error } = this.props;
    return (
      <div className='err-msg'>
        <Grid container direction='column' justify='center' alignItems='center'>
          <h3>{error || 'Error desconegut!'}</h3>
          <Button
            className='action-btn'
            onClick={this.handleBtnClick}
            variant='contained'
            color='primary'
          >Reintenta</Button>
        </Grid>
      </div>
    );
  }
}

export default ErrorPage;
