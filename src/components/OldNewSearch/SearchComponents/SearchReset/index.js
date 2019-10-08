import React from 'react';
import { Button } from 'reactstrap';

export const SearchReset = ({
  searchParams,
  resetFunction,
  children
}) => {
  const reset = searchParams.length ? children : false;

  return(
    <Button
      type="reset"
      id="reset"
      onClick={ resetFunction }
    >
      {reset}
    </Button>
  );
}

