import React from "react";
import { PiMapPinLine } from "react-icons/pi";
import { BsTelephone } from "react-icons/bs";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { ImWhatsapp } from "react-icons/im";
import { SlSocialInstagram } from "react-icons/sl";
import { TfiEmail } from "react-icons/tfi";

export default function Footer() {
  return (
    <footer className="footer">
      <section className="footer-body">
        <div className="ubicacion">
          <h3>Puntos de Contactos</h3>
          <hr className="linea" />
          <p className="encuentrano">
            <PiMapPinLine className="icon-color" /> Primer piso, Sindhu
            Center, Moon Market, cerca del restaurante Bundu Khan, Allama
            Iqbal Town, Lahore
          </p>
          <p className="phone">
            <BsTelephone className="icon-color" /> +598 543234543
          </p>
          <p className="correo">
            <MdOutlineMarkEmailRead className="icon-color" /> info@academy.com
          </p>
        </div>
        <div className="about">
          <h3>About</h3>
          <hr className="linea" />
          <p>
            Estamos aquí para la comunidad. La misión es hacer que la
            educación de calidad sea asequible y accesible para todos en esta
            región. Es por eso que Universidad Chiesa ofrece una variedad de programas
            de TI a costos razonables para los estudiantes.
          </p>
        </div>
        <div className="ubicarnos">
          <h3>Puedes Ubicarnos</h3>
          <hr className="linea" />
          <h6>
            <ImWhatsapp className="icon-color" /> WhatSapp
          </h6>
          <h6>
            <SlSocialInstagram className="icon-color" /> Instagram
          </h6>
          <h6>
            <TfiEmail className="icon-color" /> Correo Electrónico
          </h6>
        </div>
      </section>
      <section className="footer-footer">
        <p>Copyright 2024 - Universidad Chiesa - Todos los derechos reservados.</p>
      </section>
    </footer>
  );
}
