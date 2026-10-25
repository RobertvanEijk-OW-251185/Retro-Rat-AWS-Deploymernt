import React from "react";
import ratImg from '../assets/bootRat2.png';
import Bars from '../assets/bars.png'
import "./BootHeader.css";
import HeaderText from '../assets/HeaderText.png'

export default function BootHeader(){
    return(
        <>

        <header className="boot-header">
        <div className="boot-bars">
          <p>-------------------------------------</p>
          <p>-------------------------------------</p>
        </div>
        
        <div className="boot-header-text">
          <div className="boot-logo-row">
            <div className="boot-rat-wrapper">
              {/* <img src={ratImg} alt="RAT" className="boot-rat" /> */}
              <div className="boot-rat">
              <svg xmlns="http://www.w3.org/2000/svg" width="402" height="343" viewBox="0 0 402 343" fill="none">
  <g filter="url(#filter0_d_133_2348)">
    <path d="M210.219 189.094H200.75V198.562H210.219V189.094Z" fill="#01DF40"/>
    <path d="M248.094 113.344H238.625V122.812H248.094V113.344Z" fill="#01DF40"/>
    <path d="M172.344 113.344H162.875V122.812H172.344V113.344Z" fill="#01DF40"/>
    <path d="M210.219 208.031H200.75V217.5H210.219V208.031Z" fill="#01DF40"/>
    <path d="M134.469 94.4062H125V103.875H134.469V94.4062Z" fill="#01DF40"/>
    <path d="M248.094 208.031H238.625V217.5H248.094V208.031Z" fill="#01DF40"/>
    <path d="M248.094 94.4062H238.625V103.875H248.094V94.4062Z" fill="#01DF40"/>
    <path d="M172.344 170.156H162.875V179.625H172.344V170.156Z" fill="#01DF40"/>
    <path d="M172.344 94.4062H162.875V103.875H172.344V94.4062Z" fill="#01DF40"/>
    <path d="M229.156 189.094H219.688V198.562H229.156V189.094Z" fill="#01DF40"/>
    <path d="M153.406 151.219H143.938V160.687H153.406V151.219Z" fill="#01DF40"/>
    <path d="M267.031 113.344H257.562V122.812H267.031V113.344Z" fill="#01DF40"/>
    <path d="M267.031 75.4688H257.562V84.9375H267.031V75.4688Z" fill="#01DF40"/>
    <path d="M191.281 75.4688H181.812V84.9375H191.281V75.4688Z" fill="#01DF40"/>
    <path d="M229.156 132.281H219.688V141.75H229.156V132.281Z" fill="#01DF40"/>
    <path d="M229.156 94.4062H219.688V103.875H229.156V94.4062Z" fill="#01DF40"/>
    <path d="M153.406 94.4062H143.938V103.875H153.406V94.4062Z" fill="#01DF40"/>
    <path d="M267.031 132.281H257.562V141.75H267.031V132.281Z" fill="#01DF40"/>
    <path d="M191.281 94.4062H181.812V103.875H191.281V94.4062Z" fill="#01DF40"/>
    <path d="M210.219 84.9375H200.75V94.4062H210.219V84.9375Z" fill="#01DF40"/>
    <path d="M134.469 84.9375H125V94.4062H134.469V84.9375Z" fill="#01DF40"/>
    <path d="M172.344 198.562H162.875V208.031H172.344V198.562Z" fill="#01DF40"/>
    <path d="M248.094 160.688H238.625V170.156H248.094V160.688Z" fill="#01DF40"/>
    <path d="M248.094 84.9375H238.625V94.4062H248.094V84.9375Z" fill="#01DF40"/>
    <path d="M172.344 84.9375H162.875V94.4062H172.344V84.9375Z" fill="#01DF40"/>
    <path d="M210.219 179.625H200.75V189.094H210.219V179.625Z" fill="#01DF40"/>
    <path d="M134.469 103.875H125V113.344H134.469V103.875Z" fill="#01DF40"/>
    <path d="M248.094 66H238.625V75.4687H248.094V66Z" fill="#01DF40"/>
    <path d="M172.344 66H162.875V75.4687H172.344V66Z" fill="#01DF40"/>
    <path d="M248.094 179.625H238.625V189.094H248.094V179.625Z" fill="#01DF40"/>
    <path d="M248.094 103.875H238.625V113.344H248.094V103.875Z" fill="#01DF40"/>
    <path d="M172.344 179.625H162.875V189.094H172.344V179.625Z" fill="#01DF40"/>
    <path d="M172.344 103.875H162.875V113.344H172.344V103.875Z" fill="#01DF40"/>
    <path d="M153.406 122.812H143.938V132.281H153.406V122.812Z" fill="#01DF40"/>
    <path d="M229.156 84.9375H219.688V94.4062H229.156V84.9375Z" fill="#01DF40"/>
    <path d="M153.406 84.9375H143.938V94.4062H153.406V84.9375Z" fill="#01DF40"/>
    <path d="M191.281 198.562H181.812V208.031H191.281V198.562Z" fill="#01DF40"/>
    <path d="M229.156 141.75H219.688V151.219H229.156V141.75Z" fill="#01DF40"/>
    <path d="M229.156 66H219.688V75.4687H229.156V66Z" fill="#01DF40"/>
    <path d="M153.406 66H143.938V75.4687H153.406V66Z" fill="#01DF40"/>
    <path d="M229.156 103.875H219.688V113.344H229.156V103.875Z" fill="#01DF40"/>
    <path d="M153.406 179.625H143.938V189.094H153.406V179.625Z" fill="#01DF40"/>
    <path d="M153.406 103.875H143.938V113.344H153.406V103.875Z" fill="#01DF40"/>
    <path d="M267.031 141.75H257.562V151.219H267.031V141.75Z" fill="#01DF40"/>
    <path d="M143.937 113.344H134.469V122.812H143.937V113.344Z" fill="#01DF40"/>
    <path d="M219.687 75.4688H210.219V84.9375H219.687V75.4688Z" fill="#01DF40"/>
    <path d="M181.812 189.094H172.344V198.562H181.812V189.094Z" fill="#01DF40"/>
    <path d="M257.562 151.219H248.094V160.687H257.562V151.219Z" fill="#01DF40"/>
    <path d="M143.937 132.281H134.469V141.75H143.937V132.281Z" fill="#01DF40"/>
    <path d="M219.687 94.4062H210.219V103.875H219.687V94.4062Z" fill="#01DF40"/>
    <path d="M181.812 132.281H172.344V141.75H181.812V132.281Z" fill="#01DF40"/>
    <path d="M257.562 94.4062H248.094V103.875H257.562V94.4062Z" fill="#01DF40"/>
    <path d="M181.812 94.4062H172.344V103.875H181.812V94.4062Z" fill="#01DF40"/>
    <path d="M238.625 113.344H229.156V122.812H238.625V113.344Z" fill="#01DF40"/>
    <path d="M162.875 113.344H153.406V122.812H162.875V113.344Z" fill="#01DF40"/>
    <path d="M200.75 189.094H191.281V198.562H200.75V189.094Z" fill="#01DF40"/>
    <path d="M162.875 208.031H153.406V217.5H162.875V208.031Z" fill="#01DF40"/>
    <path d="M238.625 170.156H229.156V179.625H238.625V170.156Z" fill="#01DF40"/>
    <path d="M238.625 94.4062H229.156V103.875H238.625V94.4062Z" fill="#01DF40"/>
    <path d="M162.875 94.4062H153.406V103.875H162.875V94.4062Z" fill="#01DF40"/>
    <path d="M200.75 208.031H191.281V217.5H200.75V208.031Z" fill="#01DF40"/>
    <path d="M276.5 94.4062H267.031V103.875H276.5V94.4062Z" fill="#01DF40"/>
    <path d="M219.687 198.562H210.219V208.031H219.687V198.562Z" fill="#01DF40"/>
    <path d="M257.562 122.812H248.094V132.281H257.562V122.812Z" fill="#01DF40"/>
    <path d="M257.562 84.9375H248.094V94.4062H257.562V84.9375Z" fill="#01DF40"/>
    <path d="M181.812 84.9375H172.344V94.4062H181.812V84.9375Z" fill="#01DF40"/>
    <path d="M143.937 141.75H134.469V151.219H143.937V141.75Z" fill="#01DF40"/>
    <path d="M257.562 66H248.094V75.4687H257.562V66Z" fill="#01DF40"/>
    <path d="M181.812 141.75H172.344V151.219H181.812V141.75Z" fill="#01DF40"/>
    <path d="M181.812 66H172.344V75.4687H181.812V66Z" fill="#01DF40"/>
    <path d="M257.562 179.625H248.094V189.094H257.562V179.625Z" fill="#01DF40"/>
    <path d="M257.562 103.875H248.094V113.344H257.562V103.875Z" fill="#01DF40"/>
    <path d="M181.812 103.875H172.344V113.344H181.812V103.875Z" fill="#01DF40"/>
    <path d="M238.625 198.562H229.156V208.031H238.625V198.562Z" fill="#01DF40"/>
    <path d="M238.625 84.9375H229.156V94.4062H238.625V84.9375Z" fill="#01DF40"/>
    <path d="M162.875 160.688H153.406V170.156H162.875V160.688Z" fill="#01DF40"/>
    <path d="M162.875 84.9375H153.406V94.4062H162.875V84.9375Z" fill="#01DF40"/>
    <path d="M276.5 84.9375H267.031V94.4062H276.5V84.9375Z" fill="#01DF40"/>
    <path d="M200.75 84.9375H191.281V94.4062H200.75V84.9375Z" fill="#01DF40"/>
    <path d="M238.625 66H229.156V75.4687H238.625V66Z" fill="#01DF40"/>
    <path d="M162.875 66H153.406V75.4687H162.875V66Z" fill="#01DF40"/>
    <path d="M238.625 179.625H229.156V189.094H238.625V179.625Z" fill="#01DF40"/>
    <path d="M238.625 103.875H229.156V113.344H238.625V103.875Z" fill="#01DF40"/>
    <path d="M162.875 179.625H153.406V189.094H162.875V179.625Z" fill="#01DF40"/>
    <path d="M162.875 103.875H153.406V113.344H162.875V103.875Z" fill="#01DF40"/>
    <path d="M276.5 103.875H267.031V113.344H276.5V103.875Z" fill="#01DF40"/>
    <path d="M200.75 179.625H191.281V189.094H200.75V179.625Z" fill="#01DF40"/>
    <path d="M143.937 75.4688H134.469V84.9375H143.937V75.4688Z" fill="#01DF40"/>
  </g>
  <defs>
    <filter id="filter0_d_133_2348" x="0" y="-58.5" width="401.5" height="401.5" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="0.5"/>
      <feGaussianBlur stdDeviation="62.5"/>
      <feComposite in2="hardAlpha" operator="out"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0.87451 0 0 0 0 0.247059 0 0 0 1 0"/>
      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_133_2348"/>
      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_133_2348" result="shape"/>
    </filter>
  </defs>
</svg>
              </div>
            </div>
            <div className="boot-titles">
              <p className="boot-title">RATTR0 OS</p>
              <p className="boot-version">v10.3.1</p>
              <p className="boot-tagline">"Old tech, New Hands"</p>
            </div>
          </div>
        </div>
        
        <div className="boot-bars">
          <p>-------------------------------------</p>
          <p>-------------------------------------</p>
        </div>
        </header>
        </>
    )
}
