import './globals.css';
import { Analytics } from '@vercel/analytics/react';

export const metadata = {
	title: 'Spiritlife 10th Anniversary DP Generator',
	description: 'Compose a Spiritlife 10th Anniversary display picture with your photo and name.',
	metadataBase: new URL('https://getdp.vercel.app'),
	openGraph: {
		title: 'Spiritlife 10th Anniversary DP Generator',
		description: 'Blend your photo with the official Spiritlife 10th Anniversary artwork and download instantly.'
	}
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className="min-h-screen bg-background text-white">
				{children}
				<Analytics />
			</body>
		</html>
	);
}
