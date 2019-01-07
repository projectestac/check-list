import React from 'react';
import Grid from '@material-ui/core/Grid';

import Product from './Product';
import Summary from './Summary';

/**
 * This React Component fills the main area with a Summary and the collection of Product components
 */
class CheckList extends React.Component {

  constructor(props) {
    super(props);
    this.summary = React.createRef();
  }

  handleUpdateUnit = (unit) => {
    this.summary.current.updateData(this.props.order.updateSummary());
    this.props.updateUnit(unit);
  }

  render() {
    const { order } = this.props;
    return (
      <div className='main-list-box'>
        <Grid container direction='column' justify='center' alignItems='flex-start'>
          <Summary ref={this.summary} order={order} />
          {order.items.map(item => <Product
            key={item.id}
            item={item}
            updateUnit={this.handleUpdateUnit} />)}
        </Grid>
      </div>
    );
  }
}

export default CheckList;
