import { Controller } from 'react-hook-form'
import { TextField } from '@mui/material'

const FormInput = ({ name, control, label, type, rules }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: true }}
      render={({ field, fieldState: { error } }) => (
        <TextField {...field} label={label} type={type} error={error} />
      )}
    />
  )
}

export default FormInput
