import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Unit from './Unit';

/**
 * This component shows a product card with product name, product ID, picture and Unit elements
 * @param {object} props 
 */
function Product(props) {
  const { item, updateUnit } = props;
  return (
    <Card className='product-box'>
      <CardHeader title={item.descripcio} subheader={item.id} id={item.id} />
      <CardContent>
        <img className='product-icon' src={`img/${item.id}.png`} alt={item.descripcio}></img>
        {item.units.map(unit => {
          unit.component = React.createRef();
          const ucmp = <Unit
            key={`${item.id}.${unit.num}`}
            item={item}
            unit={unit}
            updateUnit={updateUnit}
            ref={unit.component}
          />
          return ucmp;
        })}
      </CardContent>
    </Card>
  );
}

export default Product;
