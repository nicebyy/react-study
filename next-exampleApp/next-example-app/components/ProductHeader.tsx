import React from 'react';

interface ProductHeaderProps {
    title: string;
}

export default function ProductHeader({title}: ProductHeaderProps) {
    return (
        <div>
            <h1>{title}</h1>
        </div>
    );
}