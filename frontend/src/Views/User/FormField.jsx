import React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import {dataField} from './dataField';


export const FormField = () => {
    return (
        <>
            {dataField.map((data, key) => {
                return(
                    <Grid item xs={12} sm={data.id === "firstName" || data.id === "lastName" ? 6 : 12} key={"grid_" + key}>
                         <TextField 
                            autoFocus={key === 0 ? true : false}
                            required
                            fullWidth                           
                            key={key}
                            id={data.id} 
                            label={data.label}
                            name={data.name } 
                            autoComplete={data.autoComplete}
                            type={data.id === "password" || data.id === "confirm_password" ? "password" : "text"}
                            sx={{
                                margin: '10px 0 5px 0',
                                label: { color: '#117A5D', fontFamily: 'Time new roman' },
                                input: { color: '#117A5D', fontFamily: 'Time new roman' },
                                fielset: { color: '#117A5D' },
                            }}
                            color='success'
                        />
                    </Grid>
                )
            })}
        </>
    )
}


 