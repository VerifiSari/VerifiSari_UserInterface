import React from "react";
import PropTypes from "prop-types";
import { TextField, Grid, InputAdornment } from "@material-ui/core";
import { CardElement } from "@stripe/react-stripe-js";
import StripeTextField from "./StripeTextField";

function StripeCardForm(props) {
  const {
    stripeError,
    setStripeError,
    amount,
    amountError,
    onAmountChange,
    name,
    setName,
    publickey,
    date,
    reason
  } = props;
  return (
    <Grid container spacing={2} justify="space-between">
      <Grid item xs={8}>
        <TextField
          variant="outlined"
          margin="none"
          required
          label="Public Key"
          value={publickey}
          onChange={event => {
            setName(event.target.value);
          }}
          fullWidth
          
          autoComplete="off"
          type="text"
        />
      </Grid>
      <Grid item xs={8}>
        <TextField
          variant="outlined"
          margin="none"
          required
          label="Designation"
          value={name}
          onChange={event => {
            setName(event.target.value);
          }}
          fullWidth
          
          autoComplete="off"
          type="text"
        />
      </Grid>
      <Grid item xs={8}>
        <TextField
          variant="outlined"
          margin="none"
          required
          label="Date"
          value={date}
          onChange={event => {
            setName(event.target.value);
          }}
          fullWidth
          
          autoComplete="off"
          type="text"
        />
      </Grid>
      {/* <Grid item xs={4}>
        <TextField
          required
          value={amount}
          onChange={event => {
            onAmountChange(parseInt(event.target.value));
          }}
          error={amountError ? true : false}
          helperText={amountError}
          variant="outlined"
          fullWidth
          type="number"
          margin="none"
          label="Amount"
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <StripeTextField
          margin="none"
          fullWidth
          label="Add"
          error={stripeError ? true : false}
          helperText={stripeError}
          variant="outlined"
          required
          StripeElement={CardElement}
          onChange={() => {
            if (stripeError) {
              setStripeError("");
            }
          }}
        ></StripeTextField>
      </Grid> */}
    </Grid>
  );
}

StripeCardForm.propTypes = {
  stripeError: PropTypes.string.isRequired,
  setStripeError: PropTypes.func.isRequired,
  amount: PropTypes.number.isRequired,
  onAmountChange: PropTypes.func.isRequired,
  amountError: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  setName: PropTypes.func.isRequired
};

export default StripeCardForm;
