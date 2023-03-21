import React from 'react'
import {useForm, Controller} from 'react-hook-form'
import {z} from 'zod'
import {TextField} from '@mui/material'
import {zodResolver} from '@hookform/resolvers/zod'

const schema = z.object({
    //   email: z.string().email('Invalid email').nonempty('Email is required'),
    email: z.string().nonempty('Email is required').email('Invalid email'),
})

// interface FormValues extends z.infer<typeof schema> {}

type FormValues = z.infer<typeof schema>

function App() {
    const {handleSubmit, control, reset} = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: {email: ''},
    })

    const onSubmit = (data: FormValues) => {
        console.log(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="email"
                control={control}
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
