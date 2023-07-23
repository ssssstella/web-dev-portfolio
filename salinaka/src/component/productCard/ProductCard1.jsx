import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import "./sass/productcard.css";

export default function ProductCard1({ id, name, brand, img }) {

    const navigate = useNavigate();
    const handle = (id) => {
        navigate(`/product/${id}`)
    }

    return (
        <Card className="productCard1" 
              onClick = {() => handle(id)}
              sx={{ maxHeight: 320, border: 1, borderColor: 'grey.300', borderRadius: 0 }}>
            <CardMedia
                sx={{ height: 224 }}
                image={img}
                title="glasses"
            />
            {/* change image path later */}
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                    {brand}
                </Typography>
            </CardContent>
        </Card>
    )
}