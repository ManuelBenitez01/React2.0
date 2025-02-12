import React from 'react'
import './Productos.css'
export default function Productos() {

    let Productos = [
        {
            ID :1,
            Nombre: "Pescado",
            Precio: 100,
            Image:"../../Imagenes/pescado.jpg"
        },
        {
            ID :2,
            Nombre: "Camarones",
            Precio: 200,
            Image:"../../Imagenes/camarones.jpg"
        },
        {
            ID :3,
            Nombre: "Langosta",
            Precio: 300,
            Image:"../../Imagenes/langosta.jpg"
        },
        {
            ID :4,
            Nombre: "Calamares",
            Precio: 150,
            Image:"../../Imagenes/calamares.jpg" 
        },
        {
            ID :5,
            Nombre: "Cangrejo",
            Precio: 250,
            Image:"../../Imagenes/cangrejo.jpg"
        },
        {
            ID :6,
            Nombre: "Pulpo",
            Precio: 350,
            Image:"../../Imagenes/pulpo.jpg"
        },
        {
            ID :7,
            Nombre: "Almejas",
            Precio: 50,
            Image:"../../Imagenes/almejas.jpg"
        },
        {
            ID :8,
            Nombre: "Mejillones",
            Precio: 75,
            Image:"../../Imagenes/mejillones.jpg"
        },
        {
            ID :9,
            Nombre: "Ostras",
            Precio: 80,
            Image:"../../Imagenes/ostras.jpg"
        },
        {
            ID :10,
            Nombre: "Salmón",
            Precio: 120,
            Image:"../../Imagenes/salmon.jpg"
        },
        {
            ID :11,
            Nombre: "Trucha",
            Precio: 110,
            Image:"../../Imagenes/trucha.jpg"
        },
        {
            ID :12,
            Nombre: "Atún",
            Precio: 130,
            Image:"../../Imagenes/atun.jpg"
        },
        {
            ID :13,
            Nombre: "Bacalao",
            Precio: 90,
            Image:"../../Imagenes/bacalao.jpg"
        },
        {
            ID :14,
            Nombre: "Dorada",
            Precio: 140,
            Image:"../../Imagenes/dorada.jpg"
        },
        {
            ID :15,
            Nombre: "Lubina",
            Precio: 160,
            Image:"../../Imagenes/lubina.jpg"
        },
        {
            ID :16,
            Nombre: "Merluza",
            Precio: 170,
            Image:"/logo.png"
        },
    ]
function agregarCarrito(){
    console.log("Producto agregado al carrito")
}
 function eliminarCarrito(){
    console.log("Producto eliminado del carrito")
}
function comprar(){
    console.log("Compra realizada")
} 

    return (
        <div className="productos">
            {Productos.map((Producto) => {
                return (
                    <div  key={Producto.ID}>
                        <img src={Producto.Image} alt={Producto.Nombre} />
                        <h1>{Producto.Nombre}</h1>
                        <h2>{Producto.Precio}</h2>
                        <button className='button' type='button' >Comprar</button>
                    </div>
                )
            })}
        </div>
    )
}
