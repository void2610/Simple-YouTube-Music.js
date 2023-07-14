import { } from "react";
import cp from 'material-ui-color-picker';

const ColorPicker = ({ theme, setTheme } = {}) => {
  return (
    <>
      <cp
        name='color'
        defaultValue='#000'
        // value={this.state.color} - for controlled component
        onChange={color => console.log(color)}

      />
    </>
  );
};

export default ColorPicker;
