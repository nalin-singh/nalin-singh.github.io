import Head from "next/head";
import styles from "../styles/Home.module.css";

import Navbar from "../components/Navbar";
import Hero from "../components/HeroSection";
import Card from "../components/Card";
import VerticalCard from "../components/VerticalCard";

export default function Home() {
	return (
		<div>
			<Head>
				<title>Nalin Singh | UI/UX Designer and Developer</title>
				<meta name="description" content="Portfolio Website of Nalin Singh" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="text-white min-h-full">
				<div className="container">
					<Navbar />
				</div>
				<Hero />
				
				<h1 className="text-6xl font-bold container">Tech Projects</h1>
				<section className="flex container my-12">
					<Card text="Hello How you doing" subtext="doing good" />
					<Card text="Hello How you doing" subtext="doing good" />
				</section>

				<h1 className="text-6xl font-bold container">
					Design & Low-Code Projects
				</h1>
				<section className="flex flex-col container my-12">
					<VerticalCard text="Hello World" subtext="I'm a vertical card" />
				</section>
			</main>

			<footer className={styles.footer}></footer>
		</div>
	);
}
