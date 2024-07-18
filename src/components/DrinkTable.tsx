import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

type Drink = {
  id: number;
  name: string;
  portion: number;
  price: number;
  totalPrice: number;
};

type DrinkTableProps = {
  selectedDrinks: Drink[];
};

const DrinkTable: React.FC<DrinkTableProps> = ({ selectedDrinks }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>CANTIDAD</TableCell>
          <TableCell>BEBIDA</TableCell>
          <TableCell>PRECIO</TableCell>
          <TableCell>SUBTOTAL</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {selectedDrinks.map((drink, index) => (
          index < 3 && (
            <TableRow key={drink.id}>
              <TableCell>{drink.portion}</TableCell>
              <TableCell>{drink.name}</TableCell>
              <TableCell>${drink.price.toFixed(2)}</TableCell>
              <TableCell>${drink.totalPrice.toFixed(2)}</TableCell>
            </TableRow>
          )
        ))}
      </TableBody>
    </Table>
  );
};

export default DrinkTable;