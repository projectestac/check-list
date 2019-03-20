
import React from 'react';
import SnackBar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import WarningIcon from '@material-ui/icons/Warning';

/**
 * Displays a "snack bar", usually with a warning message
 */
class Snack extends React.Component {
  state = {
    message: '',
    open: false,
  }

  show(message) {
    this.setState({
      message,
      open: true,
    });
  }

  close() {
    if (this.state.open)
      this.setState({ open: false });
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway')
      return;
    this.close();
  };

  render() {
    const { open, message } = this.state;
    return <SnackBar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={open}
      autoHideDuration={6000}
      onClose={this.handleClose}
      ContentProps={{
        'aria-describedby': 'snack-message-id',
        'style': { 'background-color': '#FF0033', color: 'whitesmoke', 'font-weight': 'bold' }
      }}
      message={<span id="snack-message-id"><WarningIcon className="warning-icon" />{message}</span>}
      action={[
        <IconButton
          key="close"
          aria-label="Tanca"
          color="inherit"
          onClick={this.handleClose}
        >
          <CloseIcon />
        </IconButton>,
      ]}
    />
  }
}

export default Snack;
