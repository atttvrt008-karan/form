import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useForm, Controller } from "react-hook-form";
import Header from "./Header";
import ReactDatePicker from "react-datepicker";
import NumberFormat from "react-number-format";
import ReactSelect from "react-select";
import options from "./constants/reactSelectOptions";
import {
  TextField,
  Checkbox,
  Select,
  MenuItem,
  Switch,
  RadioGroup,
  FormControlLabel,
  ThemeProvider,
  Radio,
  createMuiTheme,
  Slider
} from "@material-ui/core";
import MuiAutoComplete from "./MuiAutoComplete";
import "react-datepicker/dist/react-datepicker.css";

import "./styles.css";
import ButtonsResult from "./ButtonsResult";
import DonwShift from "./DonwShift";

let renderCount = 0;

const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

const defaultValues = {
  Name: "",
  TextField: "",
  Select: "",
  ReactSelect: "",
  Checkbox: false,
  switch: false,
  RadioGroup: "",
  numberFormat: "",
  downShift: ""
};

function App() {
  const { handleSubmit, register, reset, control } = useForm({ defaultValues });
  const [data, setData] = useState(null);
  renderCount++;

  return (
    <ThemeProvider theme={theme}>
      <form onSubmit={handleSubmit(data => setData(data))} className="form">
        <Header renderCount={renderCount} />
        <div className="container">
          <section>
            <label>Name</label>
            <input name="Name" className="input" ref={register} />
          </section>

          <section>
            <label> Checkbox</label>
            <Controller
              as={Checkbox}
              name="Checkbox"
              type="checkbox"
              control={control}
            />
          </section>

          <section>
            <label>Radio Button</label>
            <Controller
              as={
                <RadioGroup aria-label="gender">
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                </RadioGroup>
              }
              name="RadioGroup"
              control={control}
            />
          </section>

          <section>
            <label>TextField</label>
            <Controller as={TextField} name="TextField" control={control} />
          </section>

          <section>
            <label>Age</label>
            <Controller
              as={
                <Select>
                  <MenuItem value={10}>Above 18</MenuItem>
                  <MenuItem value={20}>Below 18</MenuItem>
                  <MenuItem value={30}>18</MenuItem>
                </Select>
              }
              name="Select"
              control={control}
            />
          </section>

          <section>
            <label>Switch</label>
            <Controller
              as={Switch}
              type="checkbox"
              name="switch"
              control={control}
            />
          </section>

          <section>
            <label> Slider</label>
            <Controller
              name="MUI_Slider"
              control={control}
              defaultValue={[0, 10]}
              onChange={([, value]) => value}
              as={<Slider valueLabelDisplay="auto" max={10} step={1} />}
            />
          </section>

          <section>
            <label>Choose Country</label>
            <MuiAutoComplete control={control} />
          </section>

          <section>
            <label> Select</label>
            <Controller
              as={ReactSelect}
              options={options}
              name="ReactSelect"
              isClearable
              control={control}
            />
          </section>

          <section>
            <label>Datepicker</label>
            <Controller
              as={ReactDatePicker}
              control={control}
              valueName="selected" // DateSelect value's name is selected
              onChange={([selected]) => selected}
              name="ReactDatepicker"
              className="input"
              placeholderText="Select date"
            />
          </section>

          <section>
            <label>Number</label>
            <Controller
              as={NumberFormat}
              thousandSeparator
              name="numberFormat"
              className="input"
              control={control}
            />
          </section>

          <section>
            <Controller as={DonwShift} control={control} name="downShift" />
          </section>
        </div>

        <ButtonsResult {...{ data, reset, defaultValues }} />
      </form>
    </ThemeProvider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
