import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ExitIcon from '@material-ui/icons/ExitToApp';
import Slide from '@material-ui/core/Slide';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.node.isRequired,
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  window: PropTypes.func,
};




/**
 * Builds the app header, including a dynamic drawer containing links to all products
 * of the current order, passed via `menuItems` property.
 */
class Header extends React.Component {
  state = {
    open: false
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleClickOnItem = (id) => {
    const target = document.getElementById(id);
    if (!target)
      console.error(`No hi ha cap producte amb aquest identificador: ${id}`);
    else {
      target.scrollIntoView({ behavior: 'smooth' });
      this.handleDrawerClose();
    }
  };

  render() {
    const { open } = this.state;
    const { menuItems, centre, logout } = this.props;
    const hasDrawer = menuItems && menuItems.length > 0;

    return (
      <React.Fragment>
        <HideOnScroll {...this.props}>
          <AppBar>
            <ToolBar disableGutters={!open}>
              {hasDrawer &&
                <IconButton
                  color='inherit'
                  aria-label='Llista de productes'
                  title='Llista de productes'
                  onClick={this.handleDrawerOpen}
                >
                  <MenuIcon />
                </IconButton>
              }
              <Typography className='main-title' variant='h6' color='inherit' noWrap>
                {centre || 'Comprovació d\'Equipaments'}
              </Typography>
              {logout &&
                <IconButton
                  color='inherit'
                  aria-label='Tanca la sessió'
                  title='Tanca la sessió'
                  onClick={logout}
                >
                  <ExitIcon />
                </IconButton>
              }
            </ToolBar>
          </AppBar>
        </HideOnScroll>
        {hasDrawer &&
          <Drawer
            variant='persistent'
            anchor='left'
            open={open}
          >
            <List>
              <ListItem component='li' divider button onClick={this.handleDrawerClose}>
                <ListItemIcon>
                  <ChevronLeftIcon />
                </ListItemIcon>
                <ListItemText primary='Tanca el menú' />
              </ListItem>
              <ListItem component='li' divider button onClick={() => this.handleClickOnItem('ResumBOX')}>
                <ListItemText primary='Resum' />
              </ListItem>
              {menuItems.map(item => (
                <ListItem component='li' button key={item.id} onClick={() => this.handleClickOnItem(item.id)}>
                  <ListItemText primary={item.name} />
                </ListItem>
              ))}
            </List>
          </Drawer>
        }
      </React.Fragment>
    );
  }
}

export default Header;
