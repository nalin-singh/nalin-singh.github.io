import Head from "next/head";
import styles from "../styles/Home.module.css";

/* Imported Components */
import Navbar from "../components/Navbar";
import Hero from "../components/HeroSection";
import Card from "../components/Card";
import IconGrid from "../components/IconGrid";
import VerticalCard from "../components/VerticalCard";

/* Imported Icons */
import Docker from "../icons/Docker.svg";
import Figma from "../icons/Figma.svg";
import Github from "../icons/Github.svg";
import Medium from "../icons/Medium.svg";
import Metamask from "../icons/Metamask.svg";
import Netlify from "../icons/Netlify.svg";
import Postman from "../icons/Postman.svg";
import Webflow from "../icons/Webflow.svg";

export default function Home() {
	const tech = [Docker, Github, Metamask, Postman];
	const designAndLowCode = [Figma, Webflow];
	return (
		<div>
			<Head>
				<title>
					Nalin Singh | User Interface and Experience Designer and Developer
				</title>
				<meta name="description" content="Portfolio Website of Nalin Singh" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="text-white min-h-full">
				<div className="container">
					<Navbar />
				</div>
				<Hero />

				<section className="container my-12">
					<h1 className="text-6xl font-bold container">Tech Projects</h1>
					<div className="flex">
						<Card
							text="Wisdom Academy School Management System"
							subtext="doing good"
						/>
						<Card
							text="Cultura"
							subtext="Designed and Developed an event ticketing website for our annual college fest"
						/>
					</div>
					<IconGrid icons={tech} />
				</section>

				<section className="flex flex-col container my-12">
					<h1 className="text-6xl font-bold container">
						Design & Low-Code Projects
					</h1>
					<VerticalCard
						text="Site Re-Design and Development"
						subtext="Worked with the Founder to boost leads by 10% and SEO performance by 50% over the course of 6 months handling marketing websites"
						companyName="KPI Media"
					/>
					<IconGrid icons={designAndLowCode} />
				</section>

				<section className="container">
					<h1 className="text-6xl font-bold container">Experiences</h1>
					<div className="flex">
						<Card text="Hello How you doing" subtext="doing good" />
						<Card text="Hello How you doing" subtext="doing good" />
					</div>
				</section>

				<section className="container">
					<h1 className="text-6xl font-bold container">Technical Articles</h1>
					<div className="flex">
						<Card text="What are APIs?" subtext="doing good" />
						<Card text="Protecting APIs" subtext="doing good" />
						<Card text="Dockerizing Your Application" subtext="doing good" />
					</div>
				</section>
			</main>

			<footer className={styles.footer}></footer>
		</div>
	);
}
