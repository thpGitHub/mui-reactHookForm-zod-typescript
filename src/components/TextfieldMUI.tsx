import React from 'react'
import {useForm, Controller} from 'react-hook-form'
import {TextField} from '@mui/material'

interface FormValues {
    email: string
}

function App() {
    const {handleSubmit, control, reset} = useForm<FormValues>()

    const onSubmit = (data: FormValues) => {
        console.log(data)
    }

    const validateEmail = (value: string) => {
        if (!value) {
            return 'Email is required'
        } else if (!/\S+@\S+\.\S+/.test(value)) {
            return 'Invalid email address'
        }
        return true
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="email"
                control={control}
                defaultValue=""
                // rules={{ required: true, pattern: /^\S+@\S+$/i }}
                rules={{validate: validateEmail}}
                render={({
                    field: {onChange, onBlur, value, ref},
                    fieldState: {error},
                }) => (
                    <TextField
                        label="Email"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        inputRef={ref}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        error={!!error}
                        helperText={error ? error.message : null}
                    />
                )}
            />
            <button type="submit">Submit</button>
        </form>
    )
}

export default App
