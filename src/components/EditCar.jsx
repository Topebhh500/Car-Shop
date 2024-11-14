// EditCar.jsx
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { updateCar } from '../carapi';

export default function EditCar({ car, handleFetch, onClose }) {
    const [updatedCar, setUpdatedCar] = useState({ ...car });
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!updatedCar.brand) newErrors.brand = 'Brand is required';
        if (!updatedCar.model) newErrors.model = 'Model is required';
        if (!updatedCar.color) newErrors.color = 'Color is required';
        if (!updatedCar.fuel) newErrors.fuel = 'Fuel type is required';
        if (!updatedCar.modelYear) newErrors.modelYear = 'Model year is required';
        if (!updatedCar.price) newErrors.price = 'Price is required';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUpdatedCar(prev => ({
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
            updateCar(car._links.self.href, updatedCar)
                .then(() => {
                    handleFetch();
                    onClose();
                })
                .catch(err => {
                    console.error(err);
                    setErrors(prev => ({ ...prev, submit: 'Error updating car' }));
                });
        }
    };

    return (
        <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Edit Car</DialogTitle>
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
                    value={updatedCar.brand}
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
                    value={updatedCar.model}
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
                    value={updatedCar.color}
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
                    value={updatedCar.fuel}
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
                    value={updatedCar.modelYear}
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
                    value={updatedCar.price}
                    onChange={handleChange}
                    error={!!errors.price}
                    helperText={errors.price}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">Cancel</Button>
                <Button onClick={handleSave} color="primary">Update</Button>
            </DialogActions>
        </Dialog>
    );
}