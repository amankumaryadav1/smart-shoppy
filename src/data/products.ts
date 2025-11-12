import { Product } from "@/types/product";
import headphones from "@/assets/headphones.jpg";
import smartwatch from "@/assets/smartwatch.jpg";
import keyboard from "@/assets/keyboard.jpg";
import mouse from "@/assets/mouse.jpg";
import backpack from "@/assets/backpack.jpg";
import speaker from "@/assets/speaker.jpg";

export const products: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    price: 299.99,
    description: "Immersive audio experience with active noise cancellation and premium comfort.",
    image: headphones,
    category: "Audio",
    rating: 4.8,
    reviews: 342,
    features: ["Active Noise Cancellation", "40-hour Battery", "Premium Sound Quality"],
  },
  {
    id: "2",
    name: "Smart Fitness Watch",
    price: 399.99,
    description: "Track your health and fitness with advanced sensors and beautiful OLED display.",
    image: smartwatch,
    category: "Wearables",
    rating: 4.6,
    reviews: 521,
    features: ["Heart Rate Monitor", "GPS Tracking", "Water Resistant"],
  },
  {
    id: "3",
    name: "Mechanical RGB Keyboard",
    price: 159.99,
    description: "Professional-grade mechanical keyboard with customizable RGB lighting.",
    image: keyboard,
    category: "Accessories",
    rating: 4.9,
    reviews: 187,
    features: ["Mechanical Switches", "RGB Backlight", "Aluminum Frame"],
  },
  {
    id: "4",
    name: "Ergonomic Wireless Mouse",
    price: 79.99,
    description: "Precision gaming mouse with ergonomic design and customizable buttons.",
    image: mouse,
    category: "Accessories",
    rating: 4.7,
    reviews: 289,
    features: ["16000 DPI", "6 Programmable Buttons", "RGB Lighting"],
  },
  {
    id: "5",
    name: "Professional Laptop Backpack",
    price: 89.99,
    description: "Durable backpack with dedicated laptop compartment and anti-theft features.",
    image: backpack,
    category: "Bags",
    rating: 4.5,
    reviews: 156,
    features: ["Water Resistant", "USB Charging Port", "Anti-Theft Pocket"],
  },
  {
    id: "6",
    name: "Portable Bluetooth Speaker",
    price: 129.99,
    description: "Powerful 360-degree sound in a compact, waterproof design.",
    image: speaker,
    category: "Audio",
    rating: 4.8,
    reviews: 412,
    features: ["360° Sound", "Waterproof", "20-hour Battery"],
  },
];
