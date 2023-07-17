import MuiPhoneNumber from "material-ui-phone-number";


function InputTelefono({handleChangeTelefono,styles,telefono}) {

  const handleOnChange = (value) => {
    handleChangeTelefono(value)
  };

  return (
    <>
      <MuiPhoneNumber
        helperText="Campo obligatorio"
        fullWidth
        variant="outlined"
        margin="normal"
        name="telefono"
        defaultCountry={"ar"}
        value={telefono}
        onChange={handleOnChange}
        label="Télefono"
        size={styles}
      />
    </>
  );
}

export default InputTelefono;
