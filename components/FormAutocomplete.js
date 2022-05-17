import { Autocomplete, TextField } from '@mui/material'
import { Controller } from 'react-hook-form'

const FormAutocomplete = ({ name, control, label, options, rules }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: true }}
      render={({ field }) => (
        <Autocomplete
          {...field}
          renderInput={(params) => <TextField {...params} label={label} />}
          options={options}
        />
      )}
    />
  )
}

export default FormAutocomplete
