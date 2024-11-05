"use client";
import React from "react";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
export default function page() {
  return (
    <>
      <Navbar />
      <div className="min-h-[75vh] mx-auto flex items-center justify-center ">
        <motion.h1
          initial={{ fontSize: "10px" }}
          whileInView={{ fontSize: "60px" }}
        >
          Landing Page
        </motion.h1>
      </div>
      <Footer />
    </>
  );
}
