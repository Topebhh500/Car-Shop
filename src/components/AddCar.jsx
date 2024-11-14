// AddCar.jsx
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { saveCar } from '../carapi';

export default function AddCar({ handleFetch }) {
    const [open, setOpen] = useState(false);
    const [errors, setErrors] = useState({});
    const [car, setCar] = useState({
        brand: "",
        model: "",
        color: "",
        fuel: "",
        modelYear: "",
        price: "",
    });

    const validateForm = () => {
        const newErrors = {};
        if (!car.brand) newErrors.brand = 'Brand is required';
        if (!car.model) newErrors.model = 'Model is required';
        if (!car.color) newErrors.color = 'Color is required';
        if (!car.fuel) newErrors.fuel = 'Fuel type is required';
        if (!car.modelYear) newErrors.modelYear = 'Model year is required';
        if (!car.price) newErrors.price = 'Price is required';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleClickOpen = () => setOpen(true);
    
    const handleClose = () => {
        setOpen(false);
        setCar({
            brand: "",
            model: "",
            color: "",
            fuel: "",
            modelYear: "",
            price: "",
        });
        setErrors({});
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCar(prev => ({
            ...prev,
            [name]: name === 'modelYear' || name === 'price' 
                ? Number(value) 
                : value
        }));
        // Clear error when field is edited
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSave = () => {
        if (validateForm()) {
            saveCar(car)
                .then(() => {
                    handleFetch();
                    handleClose();
                })
                .catch(err => {
                    console.error(err);
                    setErrors(prev => ({ ...prev, submit: 'Error saving car' }));
                });
        }
    };

    return (
        <>
            <Button 
                variant="outlined" 
                onClick={handleClickOpen}
                style={{ margin: 20 }}
            >
                Add New Car
            </Button>
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>Add New Car</DialogTitle>
                <DialogContent>
                    {errors.submit && (
                        <div style={{ color: 'red', marginBottom: 10 }}>{errors.submit}</div>
                    )}
                    <TextField
                        margin="dense"
                        name="brand"
                        label="Brand"
                        fullWidth
                        variant="outlined"
                        value={car.brand}
                        onChange={handleChange}
                        error={!!errors.brand}
                        helperText={errors.brand}
                    />
                    <TextField
                        margin="dense"
                        name="model"
                        label="Model"
                        fullWidth
                        variant="outlined"
                        value={car.model}
                        onChange={handleChange}
                        error={!!errors.model}
                        helperText={errors.model}
                    />
                    <TextField
                        margin="dense"
                        name="color"
                        label="Color"
                        fullWidth
                        variant="outlined"
                        value={car.color}
                        onChange={handleChange}
                        error={!!errors.color}
                        helperText={errors.color}
                    />
                    <TextField
                        margin="dense"
                        name="fuel"
                        label="Fuel"
                        fullWidth
                        variant="outlined"
                        value={car.fuel}
                        onChange={handleChange}
                        error={!!errors.fuel}
                        helperText={errors.fuel}
                    />
                    <TextField
                        margin="dense"
                        name="modelYear"
                        label="Model Year"
                        fullWidth
                        variant="outlined"
                        type="number"
                        value={car.modelYear}
                        onChange={handleChange}
                        error={!!errors.modelYear}
                        helperText={errors.modelYear}
                    />
                    <TextField
                        margin="dense"
                        name="price"
                        label="Price"
                        fullWidth
                        variant="outlined"
                        type="number"
                        value={car.price}
                        onChange={handleChange}
                        error={!!errors.price}
                        helperText={errors.price}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">Cancel</Button>
                    <Button onClick={handleSave} color="primary">Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}