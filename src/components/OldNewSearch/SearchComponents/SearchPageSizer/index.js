import React from 'react';
import { Select } from "@cmsgov/design-system-core";

export const PageSizer = ({
  defaultPagesize,
  optionsArray,
  onChangeFunction
}) => {
  return(
    <Select
      aria-label="Results per page"
      defaultValue={defaultPagesize}
      size="medium"
      name="results_per_page"
      onChange={onChangeFunction}
    >
      {optionsArray.map((el, index) => (
        <option key={`${el}_${index}`} value={el}>{`${el} per page`}</option>
      ))
      }
    </Select>
  );
}

PageSizer.defaultProps = {
  defaultValue: 10,
  optionsArray: [5,10,25,50]
}

