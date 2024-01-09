import Image from 'next/image'
import Sibebar from '@/components/Sidebar'
import Link from 'next/link'
import { redirect } from "next/navigation";

export default function Home() {
  //const tokenStr = localStorage.getItem("token") || "";
  redirect("/signin");
}
