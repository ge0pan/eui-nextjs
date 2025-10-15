"use client";

import dynamic from "next/dynamic";

const LayoutClient = dynamic(() => import("./layout.client"), { ssr: false });

export default LayoutClient;
